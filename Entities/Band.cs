using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Band
    {
        private string name { get; set; }
        private string type { get; set; }  //rock, pop, metal, jazz..
        private string imageUrl { get; set; }
        private float bandAvgRating { get; set; }
        private List<TimeAndPlace> timesAndPlaces { get; set; }
        private List<Review> bandReviews { get; set; }
    }
}
