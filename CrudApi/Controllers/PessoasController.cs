using CrudApi.Data;
using CrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext contexto;

        public PessoasController(AppDbContext context)
        {
            contexto = context;
        }

        [HttpGet]
        [Route("pessoas")]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAsync()
        {
            return await contexto.Pessoas.AsNoTracking().ToListAsync();
        }

        [HttpGet]
        [Route("pessoas/{id}")]
        public async Task<ActionResult<Pessoa>> GetIdAsync(int id)
        {
            Pessoa pessoa = await contexto.Pessoas.FindAsync(id);

            if(pessoa == null)
                return NotFound();

            return pessoa;
        }

        [HttpPost]
        [Route("pessoas")]
        public async Task<ActionResult<Pessoa>> SalvarAsync([FromBody] Pessoa p)
        {
            await contexto.Pessoas.AddAsync(p);
            await contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("pessoas/{id}")]
        public async Task<ActionResult> AtualizarAsync(int id)
        {
            var result = contexto.Pessoas.FirstOrDefault(x => x.PessoaId == id);

            if(result == null)
                return NotFound();

            contexto.Pessoas.Update(result);
            await contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("pessoas/{id}")]
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