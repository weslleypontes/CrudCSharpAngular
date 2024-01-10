import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {


  formulario: any;
  tituloFormulario?: string;
  pessoas?: Pessoa[];

  visibilidadeTabela: boolean = true;
  visibilidadeForm: boolean = false;

  constructor(private pessoasService: PessoasService) { }

  ngOnInit(): void {

    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });

    
  }

  ExibirFormCadastro() : void{
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;
    this.tituloFormulario = "Nova Pessoa";
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

  AtualizarCadastro(pessoaId: any): void{
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;
    this.pessoasService.PegarPorId(pessoaId).subscribe(res => {
      this.tituloFormulario = `Atualizar ${res.nome} ${res.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(res.pessoaId),
        nome: new FormControl(res.nome),
        sobrenome: new FormControl(res.sobrenome),
        idade: new FormControl(res.idade),
        profissao: new FormControl(res.profissao)
      });

    });
  }

  EnviarForm(): void{
    const pessoa: Pessoa = this.formulario.value;

    this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado => {
    this.visibilidadeTabela = true;
    this.visibilidadeForm = false;
    alert('pessoa inserida com sucesso.');
    this.pessoasService.PegarTodos().subscribe(result => {
      this.pessoas = result;
    });

    });

  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeForm = false;
  }

}
