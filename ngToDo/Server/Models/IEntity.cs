using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ngToDo.Server.Models
{
    public interface IEntity
    {
        int Id { get; set; }
        DateTime CreatedDateTime { get; set; }
        bool IsDeleted { get; set; }
    }
}
