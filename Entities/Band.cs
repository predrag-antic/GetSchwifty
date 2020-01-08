using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Band
    {
        public string name { get; set; }
        public string type { get; set; }  //rock, pop, metal, jazz..
        public string imageUrl { get; set; }
        public string phone { get; set; }
        public double bandAvgRating { get; set; }
        public List<UserReview> bandReviews { get; set; }
    }
}
