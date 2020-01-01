﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetSchwifty.Entities
{
    public class Place
    {
        public string name { get; set; }
        public string address { get; set; }
        public float averageRate { get; set; }
        public List<Band> localBands { get; set; }
        public List<Review> localReviews { get; set; }
    }
}
