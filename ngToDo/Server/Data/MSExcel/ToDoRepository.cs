using Microsoft.Office.Interop.Excel;
using ngToDo.Server.Models;
using System;
using System.Linq;

namespace ngToDo.Server.Data.MSExcel
{
    public class ToDoRepository : BaseRepository<ToDo>, IToDoRepository
    {

        protected override void UpdateRow(int rowIndex, _Worksheet worksheet, ToDo entity)
        {
            worksheet.Cells[rowIndex, 1] = entity.Id;
            worksheet.Cells[rowIndex, 2] = entity.Name;
            worksheet.Cells[rowIndex, 3] = entity.Description;
            worksheet.Cells[rowIndex, 4] = entity.CreatedDateTime;
            worksheet.Cells[rowIndex, 5] = entity.CompletedDateTime;
            worksheet.Cells[rowIndex, 6] = entity.ToDoStatus;
            worksheet.Cells[rowIndex, 7] = entity.IsDeleted;
        }

        protected override ToDo BuildFromRow(dynamic row)
        {
            return new ToDo()
            {
                Id = (int)row.Cells[1].Value,
                Name = row.Cells[2].Value
            };
        }

        protected override string WorksheetName
        {
            get { return "Todos"; }
        }

        protected override int OffSet { get { return 1; } }

        public IQueryable<ToDo> GetAllByUsername(string name)
        {
            throw new NotImplementedException();
        }
    }
}