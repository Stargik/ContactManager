using System;
using System.Globalization;
using CsvHelper.Configuration.Attributes;

namespace ContactManager.Models
{
    public class ContactDTO
    {
        public string Name { get; set; }
        [Name("Date of birth")]
        public DateTime BirthDate { get; set; }
        [Name("Married")]
        public bool IsMarried { get; set; }
        public string Phone { get; set; }
        public decimal Salary { get; set; }
    }
}

