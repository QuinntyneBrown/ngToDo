﻿using System;

namespace ngToDo.Server.Models
{
    public class ToDo: IEntity
    {
        public ToDo()
        {
            this.ToDoStatus = ToDoStatus.New;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Username { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? CompletedDateTime { get; set; }

        public ToDoStatus ToDoStatus { get; set; }

        public bool IsDeleted { get; set; }

    }
}