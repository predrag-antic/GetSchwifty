using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class FavoriteBand
    {
        public string name { get; set; }
        public string type { get; set; }  //rock, pop, metal, jazz..
        public string imageUrl { get; set; }
    }
}
