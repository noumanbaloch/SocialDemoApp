using API.DTOs;
using API.Entities;
using System.Collections;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(UserEntity user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<UserEntity>> GetUsersAsync();
        Task<UserEntity> GetUserByIdAsync(int id);
        Task<UserEntity> GetUserByNameAsync(string username);
        Task<IEnumerable<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberAsync(string username);

    }


}
