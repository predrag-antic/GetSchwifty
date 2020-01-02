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
    public class ReviewController : ControllerBase
    {
        [HttpGet("{name}")]
        public List<Review> GetReviews(string name)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            List<Review> reviews = new List<Review>();

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


            var reviewQuery = graphClient.client.Cypher
                .Match("(:User)-[:LEAVE]->(review:Review)<-[:HAS_REVIEW]-(n { name:'" + name + "'})")
                .With("review {nameOfBandOrPlace:n.name,comment:review.comment,rating:review.rating}")
                .Return((review) => new {
                    Reviews = review.CollectAs<Review>(),
                })
                .Results;


            if (reviewQuery.Count() == 0)
            {
                //204 No Content, user doesnt exist
                return null;
            }
            reviews = reviewQuery.ToList()[0].Reviews.ToList();

            return reviews;
        }

        [HttpPost]
        public ActionResult PostReview([FromBody] UserReview reviewInfo)
        {
            GraphClientConnection graphClient = new GraphClientConnection();

            if (graphClient == null)
            {
                return StatusCode(500);
            }

            Review newReview = new Review { comment= reviewInfo.comment, rating= reviewInfo.rating, nameOfBandOrPlace= reviewInfo.nameOfBandOrPlace};

            graphClient.client.Cypher
                .Match("(n {name:'" + reviewInfo.nameOfBandOrPlace + "'}), (u {name:'" + reviewInfo.userName + "'})")
                .Create("(r:Review {newReview}), (u)-[:LEAVE]->(r)<-[:HAS_REVIEW]-(n)")
                .WithParam("newReview", newReview)
                .ExecuteWithoutResults();

            return StatusCode(200);
        }
    }
}