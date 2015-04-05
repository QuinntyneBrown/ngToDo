namespace ngToDo.Server.Dtos
{
    public class RegistrationRequestDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }
}