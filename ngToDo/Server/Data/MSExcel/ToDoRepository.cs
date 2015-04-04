using Microsoft.Office.Interop.Excel;
using ngToDo.Server.Models;
using System;
using System.Linq;
using System.Collections.Generic;

namespace ngToDo.Server.Data.MSExcel
{
    public class ToDoRepository: IToDoRepository
    {        
        public IQueryable<ToDo> GetAll()
        {
            return BuildListFromDataSource(GetWorkbook(readOnly: true));
        }

        public ToDo GetById(int id)
        {
            return GetAll().FirstOrDefault(x => x.Id == id);
        }

        public void Add(ToDo entity)
        {
            var worksheet = GetWorkbook(readOnly: false).Worksheets["ToDos"];
            var rowIndex = GetRowIndex(worksheet);
            entity.Id = rowIndex - Offset;
            entity.CreatedDateTime = DateTime.Now;
            entity.Status = Status.NEW;
            UpdateRow(rowIndex, worksheet, entity);
        }

        public void Update(ToDo entity)
        {
            var worksheet = GetWorkbook(readOnly: false).Worksheets["ToDos"];
            var rowIndex = GetRowIndex(worksheet, entity);
            UpdateRow(rowIndex, worksheet, entity);
        }

        public void Delete(int id)
        {
            var entity = GetById(id);

            entity.IsDeleted = true;

            Update(entity);

        }

        public void Delete(ToDo entity)
        {
            Delete(entity.Id);
        }

        private int GetRowIndex(_Worksheet worksheet, ToDo entity = null)
        {
            for (var rowIndex = 2; rowIndex < MaxExcelRows; rowIndex++)
            {
                if (entity != null)
                {
                    if (worksheet.Cells[rowIndex, 1].Value == entity.Id)
                    {
                        return rowIndex;
                    }
                }
                else
                {
                    if (string.IsNullOrEmpty(worksheet.Cells[rowIndex, 1].Value))
                    {
                        return rowIndex;
                    }                    
                }

            }

            throw new InvalidOperationException();
        }
        
        private void UpdateRow(int rowIndex, _Worksheet worksheet, ToDo entity)
        {
            worksheet.Cells[rowIndex, 1] = entity.Id;
            worksheet.Cells[rowIndex, 2] = entity.Name;
            worksheet.Cells[rowIndex, 3] = entity.Description;
            worksheet.Cells[rowIndex, 4] = entity.CreatedDateTime;
            worksheet.Cells[rowIndex, 5] = entity.CompletedDateTime;
            worksheet.Cells[rowIndex, 6] = entity.Status;
            worksheet.Cells[rowIndex, 7] = entity.IsDeleted;
        }

        private ToDo BuildFromRow(dynamic row)
        {
            return new ToDo() { Name = row.Cells[2].Value };
        }

        public IQueryable<ToDo> BuildListFromDataSource(Microsoft.Office.Interop.Excel._Workbook workbook)
        {
            _Worksheet worksheet = workbook.Worksheets["ToDos"];

            List<ToDo> entities = new List<ToDo>();
            int rowIndex = 2;
            do
            {
                entities.Add(BuildFromRow(worksheet.Rows[rowIndex]));
                rowIndex++;
            } while (string.IsNullOrEmpty(worksheet.Cells[rowIndex, 1].Value) == false);

            return entities.AsQueryable();
        }
        
        public Microsoft.Office.Interop.Excel._Worksheet GetWorksheet(string name, bool readOnly = true)
        {
            return GetWorkbook(readOnly).Worksheets[name];
        }

        public Microsoft.Office.Interop.Excel._Workbook GetWorkbook(bool readOnly = true)
        {
            return ExcelWorkbookProvider.GetCurrent(readOnly:readOnly);
        }

        public void Dispose()
        {
            ExcelWorkbookProvider.Dispose();
        }

        private const int MaxExcelRows = 99999;

        private const int Offset = 1;
    }
}