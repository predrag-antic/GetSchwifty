using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GetSchwifty.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GetSchwifty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        // GET: api/Event
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Event/5
        [HttpGet("{id}", Name ="Get")]
        public Event Get(int id)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            Event getEvent = new Event();
            var getEventQuery = graphClient.client.Cypher
                .Match("(e:Event{id:" + id + "})")
                .Return((e) => new {
                    Event = e.As<Event>()
                })
                .Results;
            if (getEventQuery.Count() == 0)
            {
                return null;
            }

            var getPlace = graphClient.client.Cypher
                .Match("(e:Event{id:" + id + "})-[:HAPPENS]->(place)")
                .With("place.name as placeName")
                .Return((placeName) => new
                {
                    PlaceName = placeName.As<string>()
                })
                .Results;
            if(getPlace.Count() == 0)
            {
                return null;
            }
            var getSponsores = graphClient.client.Cypher
                .Match("(sponsor)<-[:SPONSORED_BY]-(e:Event{id:" + id + "})")
                .Return((sponsor) => new
                {
                    Sponsor = sponsor.CollectAs<Sponsor>()
                })
                .Results;
            if(getSponsores.Count() == 0)
            {
                return null;
            }
            var getUsersGoingTo = graphClient.client.Cypher
                .Match("(users:User)-[:GOING_TO]->(e:Event{id:" + id + "})")
                .Return((users) => new
                {
                    Users = users.CollectAs<User>()
                })
                .Results;
            //getEvent.usersGoingTo = new List<User>();
            getEvent = getEventQuery.ToList()[0].Event;
            if(getUsersGoingTo.Count() != 0)
            {
                getEvent.usersGoingTo = getUsersGoingTo.ToList()[0].Users.ToList();
            }
            getEvent.placeName = getPlace.ToList()[0].PlaceName;
            getEvent.listOfSponsors = getSponsores.ToList()[0].Sponsor.ToList();
            return getEvent;
        }

        // POST: api/Event
        [HttpPost]
        public Event Post([FromBody] Event _newEvent)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                StatusCode(500);
                return null;
            }

            var newEventQuery = graphClient.client.Cypher
                .Match("(place:Place{name:'" + _newEvent.placeName + "'})")
                .Create("(place)<-[:HAPPENS]-(newEvent:Event{name:'" + _newEvent.name + "', topic:'" + _newEvent.topic + "', time:'"
                + _newEvent.time + "', description:'" + _newEvent.description + "', iamgeUrl:'" + _newEvent.imageUrl + "'})")
                .Set("newEvent.id = id(newEvent)")
                .Return((newEvent) => new
                {
                    NewEvent = newEvent.As<Event>()
                })
                .Results;
            if(newEventQuery.Count() == 0)
            {
                return null;
            }
            Event newEvent = new Event();
            newEvent = newEventQuery.ToList()[0].NewEvent;
            newEvent.placeName = _newEvent.placeName;
            newEvent.listOfSponsors = new List<Sponsor>();
            foreach(var sponsor in _newEvent.listOfSponsors)
            {
                var getSponsor = graphClient.client.Cypher
                    .Match("(s:Sponsor{name:'" + sponsor.name + "'})")
                    .Return((s) => new
                    {
                        Sponsor = s.As<Sponsor>()
                    })
                    .Results;
                if (getSponsor.Count() == 0)
                {
                    var addSponsor = graphClient.client.Cypher
                        .Match("(event:Event{id:" + newEventQuery.ToList()[0].NewEvent.id + "})")
                        .Create("(event)-[:SPONSORED_BY]->(newSponsor:Sponsor{name:'" + sponsor.name + "', description:'"
                        + sponsor.description + "'})")
                        .Return((newSponsor) => new
                        {
                            NewSponsor = newSponsor.As<Sponsor>()
                        })
                        .Results;
                    newEvent.listOfSponsors.Add(addSponsor.ToList()[0].NewSponsor);
                }
                else
                {
                    var addSponsor = graphClient.client.Cypher
                        .Match("(event:Event{id:" + newEventQuery.ToList()[0].NewEvent.id + "}), " +
                        "(sponsor:Sponsor{name:'" + sponsor.name + "'})")
                        .Create("(event)-[:SPONSORED_BY]->(sponsor)")
                        .Return((sponsor) => new
                        {
                            Sponsor = sponsor.As<Sponsor>()
                        })
                        .Results;
                    newEvent.listOfSponsors.Add(addSponsor.ToList()[0].Sponsor);
                }
            }

            return newEvent;
        }

        // POST: api/Event/userGoingTo
        [HttpPost("userGoingTo",Name = "UserGoingTo")]
        public StatusCodeResult UserGoingTo([FromBody]UserEvent _newUserEvent)
        {
            GraphClientConnection graphClient = new GraphClientConnection();
            if (graphClient == null)
            {
                return StatusCode(500);
            }

            var eventId = graphClient.client.Cypher
                .Match("(event:Event{id:" + _newUserEvent.eventId + "})")
                .With("event.id as eventId")
                .Return((eventId) => new
                {
                    EventId = eventId.As<int>()
                })
                .Results;
            if(eventId.Count() == 0)
            {
                return StatusCode(500);
            }

            var userId = graphClient.client.Cypher
                .Match("(user:User{id:'" + _newUserEvent.userId + "'})")
                .With("user.id as userId")
                .Return((userId) => new
                {
                    UserId = userId.As<string>()
                })
                .Results;
            if(userId.Count() == 0)
            {
                return StatusCode(500);
            }

            graphClient.client.Cypher
                .Match("(event:Event{id:" + _newUserEvent.eventId + "}), (user:User{id:'" + _newUserEvent.userId + "'})")
                .Create("(user)-[:GOING_TO]->(event)")
                .ExecuteWithoutResults();
            return StatusCode(204);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
