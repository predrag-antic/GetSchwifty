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
    public class BandController : ControllerBase
    {
        // GET: api/Band
        [HttpGet]
        public List<Band> GetBands()
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            List<Band> bands = new List<Band>();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            var bandQuery = graphClient.client.Cypher
                .Match("(band:Band)")
                .Return((band) => new {
                    Bands = band.CollectAs<Band>(),
                })
                .Results;


            if (bandQuery.Count() == 0)
            {
                //204 No Content, user doesnt exist
                return null;
            }
            bands = bandQuery.ToList()[0].Bands.ToList();

            return bands;
        }

        // GET: api/Band/5
        [HttpGet("{name}")]
        public Band GetBand(string name)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            Band band = new Band();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            if (name == null)
            {
                StatusCode(400);
                return null;
            }


            var bandQuery = graphClient.client.Cypher
                .Match("(band:Band{ name:'" + name + "'})")
                .Return((band) => new {
                    Band = band.As<Band>(),
                })
                .Results;

            var avgRatingQuery = graphClient.client.Cypher
                .OptionalMatch("(b:Band {name:'" + name + "'})-[:HAS_REVIEW]->(r:Review)<-[:LEAVE]-(u:User)")
                .With("avg(r.rating) as bandAvgRating")
                .Return((bandAvgRating) => new {
                    BandAvgRating = bandAvgRating.As<Double>()
                })
                .Results;

            var bandsReviewQuery = graphClient.client.Cypher
               .OptionalMatch("(u:User)-[:LEAVE]->(bandsReviews:Review)<-[:HAS_REVIEW]-(band:Band { name:'" + name + "'})")
               .With("bandsReviews {nameOfBandOrPlace:band.name, comment:bandsReviews.comment, rating:bandsReviews.rating, userId: u.id, userName: u.name }")
                .Return((bandsReviews) => new {
                    BandsReviews = bandsReviews.CollectAs<UserReview>()
                })
                .Results;

            if (bandQuery.Count() == 0)
            {
                //204 No Content, user doesnt exist
                return null;
            }

            band.name = bandQuery.ToList()[0].Band == null ? null : bandQuery.ToList()[0].Band.name;
            band.type = bandQuery.ToList()[0].Band == null ? null : bandQuery.ToList()[0].Band.type;
            band.imageUrl = bandQuery.ToList()[0].Band == null ? null : bandQuery.ToList()[0].Band.imageUrl;
            band.phone = bandQuery.ToList()[0].Band == null ? null : bandQuery.ToList()[0].Band.phone;
            band.bandAvgRating = avgRatingQuery.ToList()[0].BandAvgRating;
            band.bandReviews = bandsReviewQuery.ToList()[0].BandsReviews == null ? null : bandsReviewQuery.ToList()[0].BandsReviews.ToList();

            return band;
        }

        // POST: api/Band
        [HttpPost]
        public Band PostBand([FromBody] Band bandInfo)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            Band newBand = new Band { name = bandInfo.name, type = bandInfo.type, phone = bandInfo.phone, imageUrl= bandInfo.imageUrl };

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }


            var newBandQueryResult = graphClient.client.Cypher
                .Create("(band:Band {newBand})")
                .WithParam("newBand", newBand)
                .Return((band) => new
                {
                    Band = band.As<Band>()
                })
                .Results;

            if (newBandQueryResult.Count() == 0)
            {
                StatusCode(500);
                return null;
            }

            newBand = newBandQueryResult.ToList()[0].Band;
            StatusCode(200);

            return newBand;

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{name}")]
        public void Delete(string name)
        {
            GraphClientConnection graphClient = new GraphClientConnection();

            graphClient.client.Cypher
                .Match("(b:Band {name:'" + name + "'})")
                .DetachDelete("b")
                .ExecuteWithoutResults();
        }
    }
}
