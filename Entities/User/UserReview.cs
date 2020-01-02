using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class UserReview
    {
        public string userName { get; set; }
        public string comment { get; set; }
        public int rating { get; set; }
        public string nameOfBandOrPlace { get; set; }
    }
}
