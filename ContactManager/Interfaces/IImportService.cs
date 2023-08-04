using System;
namespace ContactManager.Interfaces
{
	public interface IImportService
	{
		Task ImportContactsAsync(Stream stream, CancellationToken cancellationToken);
	}
}

