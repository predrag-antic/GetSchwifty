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
                .Match("(b:Band)-[:HAS_REVIEW]->(r)")
                .Where("b.name = '" + name + "'")
                .Return<int>("avg(r.rating)")
                .Results;

            var numOfRatingQuery = graphClient.client.Cypher
                .Match("(b:Band)-[:HAS_REVIEW]->(r)")
                .Where("b.name = '" + name + "'")
                .Return<int>("count(r)")
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

            band.name = bandQuery.ToList()[0].Band.name;
            band.type = bandQuery.ToList()[0].Band.type;
            band.imageUrl = bandQuery.ToList()[0].Band.imageUrl;
            band.phone = bandQuery.ToList()[0].Band.phone;
            band.bandAvgRating = avgRatingQuery.ToList()[0];
            band.numOfRatings = numOfRatingQuery.ToList()[0];
            band.bandReviews = bandsReviewQuery.ToList()[0].BandsReviews.ToList();

            return band;
        }

        // POST: api/Band
        [HttpPost]
        public ActionResult PostBand([FromBody] Band bandInfo)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            Band newBand = new Band();

            if (graphClient == null)
            {
                StatusCode(500);
            }

            newBand.name = bandInfo.name;
            newBand.type = bandInfo.type;
            newBand.imageUrl = bandInfo.imageUrl;
            newBand.phone = bandInfo.phone;
            newBand.bandAvgRating = 0;
            newBand.numOfRatings = 0;
            newBand.bandReviews = null;

            graphClient.client.Cypher
                .Create("(band:Band {newBand})")
                .WithParam("newBand", newBand)
                .ExecuteWithoutResults();

            return StatusCode(200);

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
