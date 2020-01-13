using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Place
    {
        public string ownerId { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string imageUrl { get; set; }
        public double averageRate { get; set;}
        public List<TimeAndBand> placeBands { get; set; }
        public List<UserReview> placeReviews { get; set; }
        public List<Event> listOfEvents { get; set; }

    }
}
