using Microsoft.EntityFrameworkCore;
using CrudApi.Models;
namespace CrudApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }

        //EntityFrameworkCore\Add-Migration InitialCreation EntityFrameworkCore\Update-DataBase
        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options)
        {

        }
    }
}