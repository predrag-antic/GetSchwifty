using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class User
    {
        private string id { get; set; }
        private string name { get; set; }
        private int age { get; set; }
        private string gender { get; set; }
        private List<Band> favoriteBands { get; set; }
        private List<Place> favoritePlaces { get; set; }
        private List<Review> reviewPlaces { get; set; }
        private List<Review> reviewBand { get; set; }
        private List<User> followedUsers { get; set; }
    }
}
