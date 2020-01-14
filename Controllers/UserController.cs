using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GetSchwifty.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient.Cypher;
using Neo4jClient;
using Newtonsoft.Json.Linq;

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
        /// .With("bandsReviews {nameOfBandOrPlace:band.name,comment:bandsReviews.comment,rating:bandsReviews.rating}") -bandsReviews is object {name:"",comment:"",rating:""}
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

            var myPlacesQuery = graphClient.client.Cypher
                 .OptionalMatch("(:User{ id:'" + userId + "'})-[:CREATE]->(place:Place)")
                 .With("place.name as placeName")
                 .Return((placeName) => new {
                     MyPlaces = placeName.CollectAs<string>()
                 })
                 .Results;

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
               .With("bandsReviews {nameOfBandOrPlace:band.name,comment:bandsReviews.comment,rating:bandsReviews.rating}")
                .Return((bandsReviews) => new {
                    BandsReviews = bandsReviews.CollectAs<Review>()
                })
                .Results;

            var placesReviewQuery = graphClient.client.Cypher
               .OptionalMatch("(:User{ id:'" + userId + "'})-[:LEAVE]->(placesReviews:Review)<-[:HAS_REVIEW]-(place:Place)")
               .With("placesReviews {nameOfBandOrPlace:place.name,comment:placesReviews.comment,rating:placesReviews.rating}")
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

            var goingToEventsUsersQuery = graphClient.client.Cypher
                .OptionalMatch("(:User{ id:'" + userId + "'})-[:GOING_TO]->(ev:Event)")
                .With("ev {eventId:ev.id,eventName:ev.name}")
                .Return((ev) => new {
                    EventIdEventName = ev.CollectAs<EventIdName>()
                })
                .Results;

            user.id = userQuery.ToList()[0].User.id;
            user.name = userQuery.ToList()[0].User.name;
            user.age = userQuery.ToList()[0].User.age;
            user.isOwner = userQuery.ToList()[0].User.isOwner;
            user.gender = userQuery.ToList()[0].User.gender;
            user.myPlaces = myPlacesQuery.ToList()[0].MyPlaces.ToList();
            user.favoriteBands = favBandsQuery.ToList()[0].FavBands.ToList();
            user.favoritePlaces= favPlacesQuery.ToList()[0].FavPlaces.ToList();
            user.reviewBand = bandsReviewQuery.ToList()[0].BandsReviews.ToList();
            user.reviewPlaces = placesReviewQuery.ToList()[0].PlacesReviews.ToList();
            user.followedUsers = followedUsersQuery.ToList()[0].FollowedUsers.ToList();
            user.userEvents = goingToEventsUsersQuery.ToList()[0].EventIdEventName.ToList();
            StatusCode(200);
            return user;
        }

        // POST: api/User/LoginUser
        [HttpPost("LoginUser", Name = "LoginUser")]
        public User LoginUser([FromBody] User _user)
        {
            GraphClientConnection graphClient = new GraphClientConnection();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            if (_user.name == null || _user.password==null)
            {
                //204
                return null;
            }

            User user = new User();

            var userQuery = graphClient.client.Cypher
                .Match("(user:User{name:'" + _user.name + "', password:'" + _user.password + "'})")
                .Return((user) => new {
                    User = user.As<User>(),
                })
                .Results;

            if (userQuery.Count() == 0)
            {
                //204 No Content, user doesnt exist
                return null;
            }
            StatusCode(200);
            return Get(userQuery.ToList()[0].User.id);
        }

        // POST: api/User/RegisterUser
        [HttpPost("RegisterUser")]
        public ActionResult Post([FromBody] User _user)
        {
            GraphClientConnection graphClient = new GraphClientConnection();

            if (graphClient == null) 
            {
                StatusCode(500);
                return null; 
            }

            if (_user == null)
            {
                StatusCode(400);
                return null;
            }

            var newUser = new User { id = _user.id, name = _user.name, password=_user.password, age=_user.age, isOwner=_user.isOwner, gender=_user.gender};

            graphClient.client.Cypher
                .Create("(user:User {newUser})")
                .WithParam("newUser", newUser)
                .ExecuteWithoutResults();
             
            return StatusCode(200);
        }


        // POST: api/User/FollowUser
        [HttpPost("FollowUser", Name = "FollowUser")]
        public FollowedUser FollowUser([FromBody]UserIds userIds)
        {
            string userId = userIds.userId;
            string followedUserId = userIds.followedUserId;
            GraphClientConnection graphClient = new GraphClientConnection();
            FollowedUser followedUser = new FollowedUser();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            string matchQuery = "(user:User{id:'" + userId + "'})-[follow:FOLLOW]->(followedUser:User{id:'" + followedUserId + "'})";
            var followedUserQuery = graphClient.client.Cypher
                .Match(matchQuery)
                .Return((followedUser) => new {
                    FollowedUser = followedUser.As<FollowedUser>(),
                })
                .Results;

            if (followedUserQuery.Count() == 1) // relation between nodes exist already, so, you need to delete that relation
            {
                graphClient.client.Cypher
                     .Match(matchQuery)
                    .Delete("follow")
    .               ExecuteWithoutResults();
                //204 
                return null;
            }

            var newFollowerQuery = graphClient.client.Cypher
               .Match("(user:User{id:'" + userId + "'}),(followedUser:User{id:'" + followedUserId + "'})")
               .Create("(user)-[:FOLLOW]->(followedUser)")
               .Return((followedUser) => new {
                   FollowedUser = followedUser.As<FollowedUser>(),
               })
               .Results;

            followedUser.id = newFollowerQuery.ToList()[0].FollowedUser.id;
            followedUser.name = newFollowerQuery.ToList()[0].FollowedUser.name;
            followedUser.age = newFollowerQuery.ToList()[0].FollowedUser.age;
            followedUser.gender = newFollowerQuery.ToList()[0].FollowedUser.gender;
            return followedUser;
        }

        // POST: api/User/AddFavoriteBand
        [HttpPost("AddFavoriteBand", Name = "AddFavoriteBand")]
        public FavoriteBand AddFavoriteBand([FromBody]UserIdName userIdName)
        {
            string userId = userIdName.userId;
            string bandName = userIdName.name;
            GraphClientConnection graphClient = new GraphClientConnection();
            FavoriteBand favoriteBand = new FavoriteBand();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            string matchQuery = "(user:User{id:'" + userId + "'})-[like:LIKE]->(favoriteBand:Band{name:'" + bandName + "'})";
            var favoriteBandQuery = graphClient.client.Cypher
                .Match(matchQuery)
                .Return((favoriteBand) => new {
                    FavoriteBand = favoriteBand.As<FavoriteBand>()
                })
                .Results;

            if (favoriteBandQuery.Count() == 1) // relation between nodes exist already, so, you need to delete that relation
            {
                graphClient.client.Cypher
                    .Match(matchQuery)
                    .Delete("like")
                    .ExecuteWithoutResults();
                //204 
                return null;
            }

            var newFavoriteBandQuery = graphClient.client.Cypher
               .Match("(user:User{id:'" + userId + "'}),(favoriteBand:Band{name:'" + bandName + "'})")
               .Create("(user)-[:LIKE]->(favoriteBand)")
               .Return((favoriteBand) => new {
                   FavoriteBand = favoriteBand.As<FavoriteBand>()
               })
               .Results;

            favoriteBand.name = newFavoriteBandQuery.ToList()[0].FavoriteBand.name;
            favoriteBand.type = newFavoriteBandQuery.ToList()[0].FavoriteBand.type;
            favoriteBand.imageUrl = newFavoriteBandQuery.ToList()[0].FavoriteBand.imageUrl;
            return favoriteBand;
        }

        // POST: api/User/AddFavoritePlace
        [HttpPost("AddFavoritePlace", Name = "AddFavoritePlace")]
        public FavoritePlace AddFavoritePlace([FromBody]UserIdName userIdName)
        {
            string userId = userIdName.userId;
            string placeName = userIdName.name;
            GraphClientConnection graphClient = new GraphClientConnection();
            FavoritePlace favoritePlace = new FavoritePlace();

            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            string matchQuery = "(user:User{id:'" + userId + "'})-[like:LIKE]->(favoritePlace:Place{name:'" + placeName + "'})";
            var favoritePlaceQuery = graphClient.client.Cypher
                .Match(matchQuery)
                .Return((favoritePlace) => new {
                    FavoritePlace = favoritePlace.As<FavoritePlace>()
                })
                .Results;

            if (favoritePlaceQuery.Count() == 1) // relation between nodes exist already, so, you need to delete that relation
            {
                graphClient.client.Cypher
                    .Match(matchQuery)
                    .Delete("like")
                    .ExecuteWithoutResults();
                //204 
                return null;
            }

            var newFavoritePlaceQuery = graphClient.client.Cypher
               .Match("(user:User{id:'" + userId + "'}),(favoritePlace:Place{name:'" + placeName + "'})")
               .Create("(user)-[:LIKE]->(favoritePlace)")
               .Return((favoritePlace) => new {
                   FavoritePlace = favoritePlace.As<FavoritePlace>()
               })
               .Results;

            favoritePlace.name = newFavoritePlaceQuery.ToList()[0].FavoritePlace.name;
            favoritePlace.address = newFavoritePlaceQuery.ToList()[0].FavoritePlace.address;
            favoritePlace.imageUrl = newFavoritePlaceQuery.ToList()[0].FavoritePlace.imageUrl;
            return favoritePlace;
        }
    }
}
