using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace Project.Controllers
{
    public class GameControllerC : ApiController
    {
        Game game=new Game();
        [HttpGet]
        [Route("api/GetCard/{username}")]
        public HttpResponseMessage GetCard( string username)
        {
            
            game = GetCollections.games.Where(p => p.player1.UserName == username || p.player2.UserName == username).FirstOrDefault();
            if (game != null)
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, new { CardArray=game.CardArray,CurrentTurn=game.CurrentTurn });
            return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden);
        }

        [HttpPut]
        [Route("api/SetCardGame/{UserName}/{ChosenCards}")]
        public HttpResponseMessage SetCardGame(string UserName,string[] ChosenCards)
        {
       
            User user = GetCollections.users.FirstOrDefault(p=>p.UserName==UserName);
            game.CurrentTurn = game.player1.UserName == UserName ? game.player2.UserName : game.player1.UserName;
            if (ChosenCards[0]==ChosenCards[1])
            {
                foreach (var item in game.CardArray.Keys)
                {
                    if (item == ChosenCards[0])
                        game.CardArray[item] = UserName;
                    
                }
            }
            if (IsGameOver())
            {
                user.Score += 1;
                GetCollections.games.Remove(game);
            }

            return Request.CreateResponse(System.Net.HttpStatusCode.OK);
        }

        public bool IsGameOver()
        {
            foreach (var item in game.CardArray.Values)
            {
                if (item == null)
                    return false;
            }
            return true;
        }

    }
}