using System;
using System.ComponentModel.DataAnnotations;
using CsvHelper.Configuration.Attributes;

namespace ContactManager.Models
{
	public class Contact
	{
		public int Id { get; set; }
        public string Name { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:yyyy-MM-dd}")]
        [Display(Name = "Date of birth")]
        public DateTime BirthDate { get; set; }
        [Display(Name = "Married")]
        public bool IsMarried { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }
        public decimal Salary { get; set; }
	}
}

