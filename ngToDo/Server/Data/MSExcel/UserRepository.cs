using System.Linq;
using Microsoft.Office.Interop.Excel;
using ngToDo.Server.Models;

namespace ngToDo.Server.Data.MSExcel
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {

        protected override void UpdateRow(int rowIndex, _Worksheet worksheet, User entity)
        {
            worksheet.Cells[rowIndex, 1] = entity.Id;
            worksheet.Cells[rowIndex, 4] = entity.CreatedDateTime;
            worksheet.Cells[rowIndex, 7] = entity.IsDeleted;
        }

        protected override User BuildFromRow(dynamic row)
        {
            return new User()
            {
                Username = row.Cells[2].Value,
                Password = row.Cells[3].Value,
                IsDeleted = (bool)row.Cells[7].Value
            };
        }

        protected override string WorksheetName
        {
            get { return "Users"; }
        }

        protected override int OffSet { get { return 1; } }

        public User GetByName(string name)
        {
            return GetAll().FirstOrDefault(x => x.Username == name);
        }
    }
}