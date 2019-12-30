using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Place
    {
        private string name { get; set; }
        private string address { get; set; }
        private float averageRate { get; set; }
        private List<Band> localBands { get; set; }
        private List<Review> localReviews { get; set; }
    }
}
