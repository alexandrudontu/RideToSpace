﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class PhotoDto
    {
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsPrimary { get; set; }
    }
}