using System;
using System.Runtime.InteropServices;
using Microsoft.Office.Interop.Excel;
using ngToDo.Server.Config;

namespace ngToDo.Server.Data.MSExcel
{
    public class ExcelWorkbookProvider
    {

        public static Microsoft.Office.Interop.Excel._Workbook GetCurrent(bool readOnly)
        {
            if (current != null && current.ReadOnly != readOnly)
                Dispose();

            if (current == null)
            {
                xlApp = new Application();

                current = (_Workbook)(xlApp.Workbooks.Open(ExcelConfiguration.Config.WorkbookFullPath,
                                            0, readOnly, 5, "", "", false, XlPlatform.xlWindows, "",
                                            true, false, 0, true, false, false));
            }

            return current;

        }

        public static void Dispose()
        {
            if (current != null)
            {
                current.Close(Type.Missing, Type.Missing, Type.Missing);

                xlApp.Quit();

                Marshal.ReleaseComObject(current);

                Marshal.ReleaseComObject(xlApp);

                current = null;

                xlApp = null;

                GC.Collect();

                GC.WaitForPendingFinalizers();
            }
        }

        private static volatile _Workbook current = null;

        private static volatile Application xlApp = null;
    }
}
