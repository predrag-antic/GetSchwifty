using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GetSchwifty.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient.Cypher;
using Neo4jClient;

namespace GetSchwifty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/User
        /// <summary>
        /// .OptionalMatch() - If it cant find described path, return null
        /// .CollectAs<FavoriteBand>() - return collection of FavoriteBand
        /// .With("bandsReviews {namee:band.name,comment:bandsReviews.comment,rating:bandsReviews.rating}") -bandsReviews is object {name:"",comment:"",rating:""}
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public User Get(string userId)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            User user = new User();

            var userQuery = graphClient.client.Cypher
                .Match("(user:User{id:'"+userId+"'})")
                .Return((user) => new {
                    User = user.As<User>(),
                })
                .Results;

            if (userQuery.Count() == 0)
            {
                //204 No Content, user doesnt exist
                return null; 
            }

            var favBandsQuery = graphClient.client.Cypher
                 .OptionalMatch("(:User{ id:'" + userId + "'})-[:LIKE]->(bands:Band)")
                 .Return((bands) => new {
                     FavBands = bands.CollectAs<FavoriteBand>()
                 })
                 .Results;

            var favPlacesQuery = graphClient.client.Cypher
                .OptionalMatch("(:User{ id:'" + userId + "'})-[:LIKE]->(places:Place)")
                .Return((places) => new {
                    FavPlaces = places.CollectAs<FavoritePlace>()
                })
                .Results;

            var bandsReviewQuery = graphClient.client.Cypher
               .OptionalMatch("(:User{ id:'" + userId + "'})-[:LEAVE]->(bandsReviews:Review)<-[:HAS_REVIEW]-(band:Band)")
               .With("bandsReviews {namee:band.name,comment:bandsReviews.comment,rating:bandsReviews.rating}")
                .Return((bandsReviews) => new {
                    BandsReviews = bandsReviews.CollectAs<Review>()
                })
                .Results;

            var placesReviewQuery = graphClient.client.Cypher
               .OptionalMatch("(:User{ id:'" + userId + "'})-[:LEAVE]->(placesReviews:Review)<-[:HAS_REVIEW]-(place:Place)")
               .With("placesReviews {namee:place.name,comment:placesReviews.comment,rating:placesReviews.rating}")
               .Return((placesReviews) =>new
                {
                   PlacesReviews = placesReviews.CollectAs<Review>()
                })
                .Results;
        
            var followedUsersQuery = graphClient.client.Cypher
                .OptionalMatch("(:User{ id:'" + userId + "'})-[:FOLLOW]->(followedUsers:User)")
                .Return((followedUsers) => new {
                    FollowedUsers = followedUsers.CollectAs<FollowedUser>()
                })
                .Results;

            user.id = userQuery.ToList()[0].User.id;
            user.name = userQuery.ToList()[0].User.name;
            user.age = userQuery.ToList()[0].User.age;
            user.gender = userQuery.ToList()[0].User.gender;
            user.favoriteBands = favBandsQuery.ToList()[0].FavBands.ToList();
            user.favoritePlaces= favPlacesQuery.ToList()[0].FavPlaces.ToList();
            user.reviewBand = bandsReviewQuery.ToList()[0].BandsReviews.ToList();
            user.reviewPlaces = placesReviewQuery.ToList()[0].PlacesReviews.ToList();
            user.followedUsers = followedUsersQuery.ToList()[0].FollowedUsers.ToList();

            return user;
        }

        //// GET: api/User/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
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
