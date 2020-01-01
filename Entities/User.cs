using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class User
    {
        public string id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public List<FavoriteBand> favoriteBands { get; set; }
        public List<FavoritePlace> favoritePlaces { get; set; }
        public List<Review> reviewPlaces { get; set; }
        public List<Review> reviewBand { get; set; }
        public List<FollowedUser> followedUsers { get; set; }
    }
}
