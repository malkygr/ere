using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Project.Controllers
{
    public class Game : ApiController
    {
        [HttpGet]
        [Route("api/GetCard")]
        public HttpResponseMessage GetCard()
        {
            Game game = new Game();
           // game = GetCollections.games.Where
            if (user != null)
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, user);
            return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden);
        }

        [HttpPut]
        [Route("SetCardGame")]
        public HttpResponseMessage SetCardGame(string UserName)
        {
            
        }

    }
}