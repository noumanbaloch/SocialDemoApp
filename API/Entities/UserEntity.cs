using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("User")]
    public class UserEntity
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
