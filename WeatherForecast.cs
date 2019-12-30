using System;

namespace GetSchwifty
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}

/*
 * TestNeo4j graphClient = new TestNeo4j();
            string userName = "Misa";
            Dictionary<string, object> queryDict = new Dictionary<string, object>();
            queryDict.Add("userName", userName);

            var query = graphClient.client.Cypher
                .Match("(m:User{name:'Misaasdf'})-[:LEAVES]->(comment:Komentar)<-[:HAS_COMMENT]-(place:Lokal)")
                .Return((comment, place) => new { Komentar = comment.As<Comment>(), Lokal = place.As<Place>() })
                .Results;

            CommentPlace kom = new CommentPlace();
            if(query.Count() != 0)
            {
                kom.Komentar = query.ToList()[0].Komentar;
                kom.Place = query.ToList()[0].Lokal;
            }
           // comPlace = ((IRawGraphClient)graphClient.client).ExecuteGetCypherResults<CommentPlace>(query).FirstOrDefault();
            return kom;
            */
