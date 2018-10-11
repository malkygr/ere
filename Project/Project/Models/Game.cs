using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.Models
{
    public class Game
    {
        public User player1 { get; set; }
        public User player2 { get; set; }
        public string CurrentTurn { get; set; }
        public Dictionary<string, string> CardArray { get; set; }
        public Game()
        {
            CardArray = new Dictionary<string, string>(9)
            {
                {"A",null},
                {"B",null},
                {"C",null},
                {"D",null},
                {"E",null},
                {"F",null},
                {"G",null},
                {"H",null},
                {"I",null}


            };
        }
    }
    
}