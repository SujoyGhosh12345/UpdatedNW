//using AngularAuthAPI.Context;
//using AngularAuthAPI.Controllers;
//using AngularAuthAPI.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;
//using MongoDB.Driver;
//using Moq;
//using Newtonsoft.Json;
//using System.Net;
//using System.Reflection;
//using System.Text;
//using WatchList.Controllers;
//using WatchList.Models;
//using WatchList.Service;
//using Xunit;

//namespace PollutionAPITest
//{
//    public class Tests
//    {
//        WatchListController _controller;
//        WatchListService _service;

//        public Tests()
//        {
//            _service = new WatchListService();
//            _controller = new WatchListController(_service);
//        }
//        [SetUp]
//        public void SetUp()
//        {

//        }


//        [TearDown]
//        public void TearDown()
//        {
//        }


//        [Test]
//        public void AddListTest_ShouldReturnSuccess()
//        {
//            //Ok result
//            var completeList = new Watchlist()
//            {
//                id = 10,
//                emailId = "TimSamson@gmail.com",
//                city = "Atlanta"
//            };

//            //Act
//            var createdResponse = _controller.Post(completeList);
//            var item = createdResponse as CreatedAtActionResult;

//            //Assert

//            //Assert.That(createdResponse, Is.TypeOf<CreatedAtActionResult>());

//            //value of the result
//            Assert.That(completeList, Is.TypeOf<Watchlist>());

//            //check value of this book
//            //var listItem = item.Value as Watchlist;
//            //Assert.AreEqual(completeList.id, listItem.id);
//            //Assert.AreEqual(completeList.emailId, listItem.emailId);
//            //Assert.AreEqual(completeList.city, listItem.city);


//        }

//        [Test]
//        public void AddListTest_ShouldReturnFailure()
//        {
//            //OK RESULT TEST END

//            //BADREQUEST AND MODELSTATE ERROR TEST   
//            var incompleteList = new Watchlist()
//            {
//                emailId="ABC@gmail.com",
//                city = "Texas"
//            };

//            //Act
//            _controller.ModelState.AddModelError("Id", "Id is a requried field");
//            var badResponse = _controller.Post(incompleteList);
//            // Assume you have a bad response (e.g., from an API endpoint).
//            //IActionResult badResponse = new BadRequestObjectResult("Bad request message");

//            // Assert that the badResponse is of type BadRequestObjectResult.
//            Assert.That(badResponse, Is.TypeOf<BadRequestObjectResult>());
//            //Assert

//        }


//        [Test]
//        [TestCase(1)]

//        public void RemoveListByIdTest(int id)
//        {
//            var validid = id;

//            var okResult = _controller.Remove(validid);

//            //Assert
//            Assert.That(okResult, Is.TypeOf<OkResult>());

//            Assert.AreEqual(3, _service.GetList().Count());
//        }
//    }
//}
using AuthenticationApi.Models;

[TestFixture]
public class UserTests
{
    private List<User> userList;

    [SetUp]
    public void Setup()
    {
        // Initialize the list with some sample data for testing
        userList = new List<User>
        {
            new User { id = 1, UserName = "Alice", Email = "alice@example.com" },
            new User { id = 2, UserName = "Bob", Email = "bob@example.com" },
            new User { id = 3, UserName = "Charlie", Email = "charlie@example.com" }
        };
    }

    [Test]
    public void TestUserListNotNull()
    {
        // Ensure the user list is not null
        Assert.NotNull(userList);
    }

    [Test]
    public void TestUserListCount()
    {
        // Ensure the user list contains the expected number of users
        Assert.AreEqual(3, userList.Count);
    }

    [Test]
    public void TestUserEmails()
    {
        // Ensure all emails in the list are valid
        foreach (var user in userList)
        {
            Assert.IsTrue(IsValidEmail(user.Email));
        }
    }

    [Test]
    public void TestUserNames()
    {
        // Ensure all names in the list are not empty
        foreach (var user in userList)
        {
            Assert.IsFalse(string.IsNullOrWhiteSpace(user.UserName));
        }
    }
    private bool IsValidEmail(string email)
    {
        // Implement your email validation logic here
        // For simplicity, this example only checks for the presence of '@'
        return !string.IsNullOrWhiteSpace(email) && email.Contains("@");
    }
    [Test]
    public void TestUserWithNullEmail()
    {
        // Ensure that a user with a null email is considered invalid
        var userWithNullEmail = new User { id = 4, UserName = "David", Email = null };
        Assert.IsFalse(IsValidEmail(userWithNullEmail.Email));
    }

    [Test]
    public void TestUserWithInvalidEmailFormat()
    {
        // Ensure that a user with an invalid email format is considered invalid
        var userWithInvalidEmail = new User { id = 5, UserName = "Eve", Email = "invalidemail" };
        Assert.IsFalse(IsValidEmail(userWithInvalidEmail.Email));
    }

    [Test]
    public void TestUserWithEmptyUserName()
    {
        // Ensure that a user with an empty username is considered invalid
        var userWithEmptyUserName = new User { id = 6, UserName = "", Email = "eve@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithEmptyUserName.UserName));
    }

    [Test]
    public void TestUserWithWhiteSpaceUserName()
    {
        // Ensure that a user with a username consisting of only whitespace is considered invalid
        var userWithWhiteSpaceUserName = new User { id = 7, UserName = "   ", Email = "frank@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithWhiteSpaceUserName.UserName));
    }
}