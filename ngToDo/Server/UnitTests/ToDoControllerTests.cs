using Moq;
using ngToDo.Server.Api.v1;
using ngToDo.Server.Data;
using NUnit.Framework;
using ngToDo.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;


namespace ngToDo.Server.UnitTests
{
    [TestFixture]
    public class ToDoControllerTests
    {
        [SetUp]
        public void SetUp()
        {
            mockToDoRepository = new Mock<IRepository<ToDo>>();
            mockToDoRepository.Setup(r => r.GetById(1)).Returns(toDos.FirstOrDefault(x=>x.Id==1));
            mockToDoRepository.Setup(r => r.GetAll()).Returns(toDos.AsQueryable());
        }

        [Test]
        public void ConstructingWithValidParametersDoesNotThrowException()
        {
            Assert.DoesNotThrow(() => CreateController());
        }

        [Test]
        public void GetByIdReturnsOk()
        {
            var controller = CreateController();
            var toDo = ((OkNegotiatedContentResult<ToDo>)controller.GetById(1)).Content;
            Assert.AreEqual(toDo.Name,"Buy Something");
        }

        private ToDoController CreateController()
        {
            return new ToDoController(mockToDoRepository.Object);
        }

        private Mock<IRepository<ToDo>> mockToDoRepository;

        private List<ToDo> toDos = new List<ToDo>()
        {
            new ToDo() {Id = 1, Name = "Buy Something"}
        };
    }
}