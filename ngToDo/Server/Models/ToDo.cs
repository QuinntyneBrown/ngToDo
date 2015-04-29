using System;
using System.ComponentModel.DataAnnotations;

namespace ngToDo.Server.Models
{
    public class ToDo: IEntity
    {
        public ToDo()
        {
            this.ToDoStatus = ToDoStatus.New;
            this.ToDoPriority = ToDoPriority.Medium;
        }

        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Name { get; set; }

        [MaxLength(4000)]
        public string Description { get; set; }

        public string Username { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? CompletedDateTime { get; set; }

        public ToDoStatus ToDoStatus { get; set; }

        public ToDoPriority ToDoPriority { get; set; }

        public bool IsDeleted { get; set; }

    }
}