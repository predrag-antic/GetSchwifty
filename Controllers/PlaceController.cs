using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GetSchwifty.Entities;

namespace GetSchwifty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        //GET: api/Place
       [HttpGet]
        public List<Place> Get()
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }
            List<Place> allPlaces = new List<Place>();
            var allPlacesQuery = graphClient.client.Cypher
                .Match("(allPlaces:Place)")
                .ReturnDistinct((allPlaces) => new
                {
                    AllPlaces = allPlaces.CollectAs<Place>()
                })
                .Results;
            allPlaces = allPlacesQuery.ToList()[0].AllPlaces == null ? null : allPlacesQuery.ToList()[0].AllPlaces.ToList();
            if(allPlaces == null)
                return null;
            List<Place> sortedRatedPlaces = new List<Place>();
            Place tmp;
            foreach(var place in allPlaces)
            {
                tmp = new Place();
                var ratedPlaceQuery = graphClient.client.Cypher
                    .OptionalMatch("(p:Place{name:'" + place.name + "'})-[:HAS_REVIEW]->(r:Review)<-[:LEAVE]-()")
                    .With("avg(r.rating) as averageRate")
                    .Return((averageRate) => new
                    {
                        AverageRate = averageRate.As<Double>()
                    })
                    .Results;
                tmp = place;
                tmp.averageRate = ratedPlaceQuery.ToList()[0].AverageRate;
                if(tmp != null)
                    sortedRatedPlaces.Add(tmp);
            }
            sortedRatedPlaces = sortedRatedPlaces.OrderByDescending(x => x.averageRate).ToList();
            return sortedRatedPlaces;
        }

        // GET: api/Place/5
        [HttpGet("{name}")]
        public Place Get(string name)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }
            Place placeInfo = new Place();

            var placeQuery = graphClient.client.Cypher
                //.Match("(place:Place{name:'" + name + "'})-[:HAS_REVIEW]->(review:Review)<-[:LEAVE]-(u:User)")
                //.With("{name:place.name, address:place.address, imageUrl:place.imageUrl, phone:place.phone, averageRate:avg(review.rating)} as place")
                .Match("(place:Place{name:'" + name + "'})")
                .Return((place) => new {
                    Place = place.As<Place>()
                })
                .Results;
            if(placeQuery.Count() == 0)
            {
                return null; //code 204
            }
            var placeAvgRate = graphClient.client.Cypher
                .OptionalMatch("(place:Place{name:'" + name + "'})-[:HAS_REVIEW]->(review:Review)<-[:LEAVE]-(u:User)")
                .With("avg(review.rating) as averageRate")
                .Return((averageRate) => new {
                    AverageRate = averageRate.As<Double>()
                })
                .Results;
            var placeReviewsQuery = graphClient.client.Cypher
                .OptionalMatch("(place:Place{name:'" + name + "'})-[:HAS_REVIEW]->(reviews:Review)<-[]-(u:User)")
                .With("{nameOfBandOrPlace:place.name, comment: reviews.comment, rating:reviews.rating} as placeReviews ")
                .Return((placeReviews) => new {
                    Reviews = placeReviews.CollectAs<Review>()
                })
                .Results;

            var placeBandsQuery = graphClient.client.Cypher
                .OptionalMatch("(bands:Band)-[play:PLAY]->(p:Place{name:'" + name + "'})")
                .With("{bandName: bands.name, day: play.day, time: play.time, type: play.type} as timeAndBand ")
                .Return((timeAndBand) => new
                {
                    placeBandsTime = timeAndBand.CollectAs<TimeAndBand>()
                })
                .Results;

            placeInfo.name = placeQuery.ToList()[0].Place == null? null : placeQuery.ToList()[0].Place.name;
            placeInfo.address = placeQuery.ToList()[0].Place == null ? null : placeQuery.ToList()[0].Place.address;
            placeInfo.averageRate = placeAvgRate.ToList()[0].AverageRate;
            placeInfo.imageUrl = placeQuery.ToList()[0].Place == null ? null : placeQuery.ToList()[0].Place.imageUrl;
            placeInfo.phone = placeQuery.ToList()[0].Place == null ? null : placeQuery.ToList()[0].Place.phone;
            placeInfo.placeBands = placeBandsQuery.ToList()[0].placeBandsTime == null ? null : placeBandsQuery.ToList()[0].placeBandsTime.ToList();
            placeInfo.placeReviews = placeReviewsQuery.ToList()[0].Reviews == null ? null : placeReviewsQuery.ToList()[0].Reviews.ToList();

            return placeInfo;
        }

        // POST: api/Place/create
        [HttpPost("create")]
        public Place Post([FromBody] Place _place)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }
            
            User owner = new User();

            var ownerQuery = graphClient.client.Cypher
                .Match("(user:User{id:'" + _place.ownerId + "'})")
                .Return((user) => new
                {
                    Owner = user.As<User>()
                })
                .Results;
            owner = ownerQuery.ToList()[0].Owner;
            if(owner == null || owner.isOwner == false)
            {
                StatusCode(204);
                return null;
            }
            Place newPlace = new Place { address = _place.address, imageUrl = _place.imageUrl, name = _place.name, phone = _place.phone };
            var newPlaceQueryResult = graphClient.client.Cypher
                .Match("(owner:User{id:'" + _place.ownerId + "'})")
                .Create("(owner)-[c:CREATE]->(p:Place{address:'" + newPlace.address + "', imageUrl:'" + newPlace.imageUrl +
                "', name:'" + newPlace.name + "', phone:'" + newPlace.phone + "'})")
                .Return((p) => new
                {
                    Place = p.As<Place>()
                })
                .Results;
            if(newPlaceQueryResult.Count() == 0)
            {
                StatusCode(500);
                return null;
            }
            newPlace = newPlaceQueryResult.ToList()[0].Place;
            StatusCode(200);
            return newPlace;
        }

        [HttpPost("addBand", Name = "addBand")]
        public ObjectResult addBand([FromBody]TimeAndBand _bandTimeAndPlace)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {  
                return StatusCode(500, "{message:\"Something went wrong with db\"}");
            }
            var bandQuery = graphClient.client.Cypher
                .Match("(band:Band{name: '" + _bandTimeAndPlace.bandName + "'})")
                .Return((band) => new
                {
                    Band = band.As<Band>()
                })
                .Results;
            if(bandQuery.Count() == 0)
            {
                return StatusCode(404, "{message:\"Band doesn't exist\"}");
            }

            var placeQuery = graphClient.client.Cypher
                .Match("(place:Place{name: '" + _bandTimeAndPlace.placeName + "'})")
                .Return((place) => new
                {
                    Place = place.As<Place>()
                })
                .Results;
            if(placeQuery.Count() == 0)
            {
                return StatusCode(404, "{message:\"Place doesn't exist\"}");
            }

            var timePlaceBand = graphClient.client.Cypher
                .Match("(band:Band{name: '" + _bandTimeAndPlace.bandName + "'}), (place:Place{name: '" + _bandTimeAndPlace.placeName + "'})")
                .Create("(band)-[play:PLAY{time:'" + _bandTimeAndPlace.time + "', day:'" + _bandTimeAndPlace.day + "',type:'" +
                _bandTimeAndPlace.type + "'}]->(place)")
                .With("{placeName: place.name, bandName: band.name, day: play.day, time: play.time, type: play.type} as timePlaceAndBand ")
                .Return((timePlaceAndBand) => new
                {
                    TimePlaceAndBand = timePlaceAndBand.As<TimeAndBand>()
                })
                .Results;

            if(timePlaceBand.Count() == 0)
            {
                return StatusCode(500, "{message:\"Something went wrong\"}");
            }
            TimeAndBand tmp = timePlaceBand.ToList()[0].TimePlaceAndBand;
            return StatusCode(201, tmp);
        }

        // PUT: api/Place/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
