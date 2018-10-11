using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Project.Controllers
{
    public class UserControllerC : ApiController
    {
        [HttpPost]
        [Route("SignIn")]
        public HttpResponseMessage SignIn([FromBody]User user)
        {
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(System.Net.HttpStatusCode.Forbidden, "user or password are not valid");
           
            lock (GetCollections.users)
            {
                GetCollections.users.Add(user);
            }


            return Request.CreateResponse(System.Net.HttpStatusCode.OK, GetPartners());
        }


        public List<User> GetPartners()
        {
            lock (GetCollections.users)
            {
                return GetCollections.users.Where(p => p.PartnerUserName == null).ToList();
            }

        }
        [HttpGet]
        [Route("api/GetCurrentUser/{userName}")]
        public HttpResponseMessage GetCurrentUser(string userName)
        {
            User user = new User();
            user = GetCollections.users.Where(p => p.UserName == userName).FirstOrDefault();
            if (user != null)
                return Request.CreateResponse(System.Net.HttpStatusCode.OK, user);
            return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden);
        }
        [HttpPut]
        [Route("api/SetPartner/{username}/{partnername}")]
        public HttpResponseMessage SetPartner(string username,string partnername)
        {
            string CurrentUserName = username;
            string CurrentPartnerName = partnername;
            if (CurrentPartnerName.Equals(CurrentUserName))
                return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden, "thu user is the same as a partner");
            lock (GetCollections.users)
            {
                User user = GetCollections.users.Where(p => p.UserName == CurrentUserName).FirstOrDefault();
                User parnteruser = GetCollections.users.Where(p => p.UserName == CurrentPartnerName).FirstOrDefault();
                if (user != null)
                {
                    user.PartnerUserName = CurrentPartnerName;
                    parnteruser.PartnerUserName = CurrentUserName;
                }
                Game game = new Game() { player1 = user, player2 = parnteruser, CurrentTurn = user.UserName };
                GetCollections.games.Add(game);
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
        }
    }

}