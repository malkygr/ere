using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Project.Controllers
{
    public class UserController :ApiController
    {
        [HttpPost]
        [Route("api/SignIn")]
        public HttpResponseMessage SignIn()
        {
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(System.Net.HttpStatusCode.Forbidden, "user or password are not valid");
            User user = new User();
            user.UserName = HttpContext.Current.Request.Form["username"];
            user.Age = int.Parse(HttpContext.Current.Request.Form["age"]);
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
        [Route("api/GetCurrentUser")]
        public HttpResponseMessage GetCurrentUser(string userName)
        {
            User user = new User();
            user = GetCollections.users.Where(p => p.UserName == userName).FirstOrDefault();
          if(user!=null)
            return Request.CreateResponse(System.Net.HttpStatusCode.OK,user );
            return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden);
        }
        [HttpPut]
        [Route("SetPartner")]
        public HttpResponseMessage SetPartner()
        {
            string CurrentUserName = HttpContext.Current.Request.Form["username"];
            string CurrentPartnerName = HttpContext.Current.Request.Form["partnername"];
            if (CurrentPartnerName.Equals(CurrentUserName))
                return Request.CreateResponse(System.Net.HttpStatusCode.Forbidden,"thu user is the same as a partner");
            lock(GetCollections.users)
            {
                User user = GetCollections.users.Where(p => p.UserName == CurrentUserName).FirstOrDefault();
                User parnteruser = GetCollections.users.Where(p => p.UserName == CurrentPartnerName).FirstOrDefault();
                if(user!=null)
                {
                    user.PartnerUserName = CurrentPartnerName;
                    parnteruser.PartnerUserName = CurrentUserName;
                }
                Game game = new Game() { player1=user,player2=parnteruser,CurrentTurn=user.UserName};
               
                return Request.CreateResponse(System.Net.HttpStatusCode.OK);
            }
        }
    }

}