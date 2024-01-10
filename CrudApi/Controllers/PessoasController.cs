using CrudApi.Data;
using CrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext contexto;

        public PessoasController(AppDbContext context)
        {
            contexto = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAsync()
        {
            return await contexto.Pessoas.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetIdAsync(int id)
        {
            Pessoa pessoa = await contexto.Pessoas.FindAsync(id);

            if(pessoa == null)
                return NotFound();

            return pessoa;
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarAsync(Pessoa p)
        {
            await contexto.Pessoas.AddAsync(p);
            await contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarAsync(int id)
        {
            var result = contexto.Pessoas.FirstOrDefault(x => x.PessoaId == id);

            if(result == null)
                return NotFound();

            contexto.Pessoas.Update(result);
            await contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
                public async Task<ActionResult> DeleteAsync(int id)
        {
            var result = contexto.Pessoas.FirstOrDefault(x => x.PessoaId == id);

            if(result == null)
                return NotFound();

            contexto.Pessoas.Remove(result);
            await contexto.SaveChangesAsync();

            return Ok(); 
        }
    }
}