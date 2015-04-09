using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Office.Interop.Excel;
using ngToDo.Server.Models;

namespace ngToDo.Server.Data.MSExcel
{
    public abstract class BaseRepository<T>: IRepository<T> where T : IEntity
    {
        public void Add(T entity)
        {
            var worksheet = GetWorkbook(readOnly: false).Worksheets[WorksheetName];
            var rowIndex = GetRowIndex(worksheet, entity);
            entity.Id = rowIndex - OffSet;
            entity.CreatedDateTime = DateTime.Now;
            UpdateRow(rowIndex, worksheet, entity);
        }

        public void Update(T entity)
        {
            var worksheet = GetWorkbook(readOnly: false).Worksheets[WorksheetName];
            var rowIndex = GetRowIndex(worksheet, entity);
            UpdateRow(rowIndex, worksheet, entity);
        }

        public void Delete(int id)
        {
            var entity = GetById(id);
            entity.IsDeleted = true;
            Update(entity);
        }

        public void Delete(T entity)
        {
            Delete(entity.Id);
        }

        public IQueryable<T> GetAll()
        {
            return BuildListFromDataSource(GetWorkbook(readOnly: true));
        }

        public T GetById(int id)
        {
            return GetAll().FirstOrDefault(x => x.Id == id);
        }

        protected IQueryable<T> BuildListFromDataSource(Microsoft.Office.Interop.Excel._Workbook workbook)
        {
            _Worksheet worksheet = workbook.Worksheets[WorksheetName];
            List<T> entities = new List<T>();
            int rowIndex = 2;
            do
            {
                entities.Add(BuildFromRow(worksheet.Rows[rowIndex]));
                rowIndex++;
            } while (string.IsNullOrEmpty(worksheet.Cells[rowIndex, 1].Value) == false);

            return entities.AsQueryable();
        }

        protected abstract T BuildFromRow(dynamic row);

        public Microsoft.Office.Interop.Excel._Worksheet GetWorksheet(string name, bool readOnly = true)
        {
            return GetWorkbook(readOnly).Worksheets[name];
        }

        public Microsoft.Office.Interop.Excel._Workbook GetWorkbook(bool readOnly = true)
        {
            return ExcelWorkbookProvider.GetCurrent(readOnly: readOnly);
        }

        public void Dispose()
        {
            ExcelWorkbookProvider.Dispose();
        }

        public void SaveChanges()
        {
            ExcelWorkbookProvider.Dispose();
        }

        protected int GetRowIndex(_Worksheet worksheet, T entity)
        {
            for (var rowIndex = 2; rowIndex < MaxExcelRows; rowIndex++)
            {
                if (entity.Id == 0)
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

        protected const int MaxExcelRows = 99999;

        protected abstract int OffSet { get; }

        protected abstract void UpdateRow(int rowIndex, _Worksheet worksheet, T entity);

        protected abstract string WorksheetName { get; }
    }
}