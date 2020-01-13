using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Event
    {
        public int id { get; set; }
        public string name { get; set; }
        public string topic { get; set; }
        public string description { get; set; }
        public string time { get; set; }
        public string imageUrl { get; set; }
        public string placeName { get; set; }
        public List<Sponsor> listOfSponsors { get; set; }
        public List<User> usersGoingTo { get; set; }
    }
}
