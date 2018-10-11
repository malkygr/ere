using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Project.Models
{

    public class User
    {
        [Required]
        [MaxLength(10, ErrorMessage = "max is 10 chars")]
        [MinLength(2, ErrorMessage = "min is 2 chars")]
        public string UserName
        {
            get; set;
        }
        [Required]
        [Range(18, 120, ErrorMessage = "must be between 18-120")]
        public int Age
        {
            get;
            set;
        }

        public string PartnerUserName { get; set; }
        [DefaultValue(0)]
        public int Score
        {
            get;
            set;
        }
    }
}