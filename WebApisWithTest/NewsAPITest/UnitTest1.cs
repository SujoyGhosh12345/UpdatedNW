
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
            new User { Id = 1, Username = "Alice", Email = "alice@example.com" },
            new User { Id = 2, Username = "Bob", Email = "bob@example.com" },
            new User { Id = 3, Username = "Charlie", Email = "charlie@example.com" }
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
            Assert.IsFalse(string.IsNullOrWhiteSpace(user.Username));
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
        var userWithNullEmail = new User { Id = 4, Username = "David", Email = null };
        Assert.IsFalse(IsValidEmail(userWithNullEmail.Email));
    }

    [Test]
    public void TestUserWithInvalidEmailFormat()
    {
        // Ensure that a user with an invalid email format is considered invalid
        var userWithInvalidEmail = new User { Id = 5, Username = "Eve", Email = "invalidemail" };
        Assert.IsFalse(IsValidEmail(userWithInvalidEmail.Email));
    }

    [Test]
    public void TestUserWithEmptyUserName()
    {
        // Ensure that a user with an empty username is considered invalid
        var userWithEmptyUserName = new User { Id = 6, Username = "", Email = "eve@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithEmptyUserName.Username));
    }

    [Test]
    public void TestUserWithWhiteSpaceUserName()
    {
        // Ensure that a user with a username consisting of only whitespace is considered invalid
        var userWithWhiteSpaceUserName = new User { Id = 7, Username = "   ", Email = "frank@example.com" };
        Assert.IsTrue(string.IsNullOrWhiteSpace(userWithWhiteSpaceUserName.Username));
    }
}