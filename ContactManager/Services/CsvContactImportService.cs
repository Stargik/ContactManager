using System;
using System.Collections.Generic;
using System.Globalization;
using ContactManager.Data;
using ContactManager.Interfaces;
using ContactManager.Models;
using CsvHelper;
using CsvHelper.Configuration;

namespace ContactManager.Services
{
	public class CsvContactImportService : IImportService
	{
        private readonly ContactDbContext context;
		public CsvContactImportService(ContactDbContext context)
		{
            this.context = context;
		}

        public async Task ImportContactsAsync(Stream stream, CancellationToken cancellationToken)
        {
            List<Contact> contacts = new List<Contact>();
            var contactsDTO = await ReadContactsAsync(stream, cancellationToken);
            foreach (var contactDTO in contactsDTO)
            {
                Contact contact = ContactMapper(contactDTO);
                contacts.Add(contact);
            }
            await AddContactsAsync(contacts, context, cancellationToken);
        }

        private async Task<IEnumerable<ContactDTO>> ReadContactsAsync(Stream stream, CancellationToken cancellationToken) {

            var list = new List<ContactDTO>();
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ","
            };
            using (var reader = new StreamReader(stream))
            using (var csv = new CsvReader(reader, config))
            {
                var contacts = csv.GetRecordsAsync<ContactDTO>(cancellationToken);
                await foreach (var record in contacts)
                {
                    list.Add(record);
                }
                return list;
            }
        }

        private async Task AddContactsAsync(IEnumerable<Contact> contacts, ContactDbContext dbContext, CancellationToken cancellationToken) {
            foreach (var contact in contacts)
            {
                await dbContext.AddAsync(contact);
                await dbContext.SaveChangesAsync();
            }
        }

        private Contact ContactMapper(ContactDTO contactDTO) {
            Contact contact = new Contact
            {
                Id = 0,
                Name = contactDTO.Name,
                BirthDate = contactDTO.BirthDate,
                IsMarried = contactDTO.IsMarried,
                Phone = contactDTO.Phone,
                Salary = contactDTO.Salary
            };
            return contact;
        }
    }
}

