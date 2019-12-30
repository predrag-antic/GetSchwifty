using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4jClient;

namespace GetSchwifty
{
    public class GraphClientConnection
    {
        public GraphClient client;
        public GraphClientConnection()
        {
            client = new GraphClient(new Uri("http://localhost:7474/db/data/"), "neo4j", "1111");
            try
            {
                client.Connect();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.Message);
            }
        }
    }
}
