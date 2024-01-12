import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  nomePessoa?: string;
  pessoaId: number = 0;

  visibilidadeTabela: boolean = true;
  visibilidadeForm: boolean = false;

  modalRef?: BsModalRef;

  constructor(private pessoasService: PessoasService,
    private modalService: BsModalService) { }

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

  Atualizar(id: number): void{
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;

    this.pessoasService.PegarPorId(id).subscribe(res => {
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

    if(pessoa.pessoaId > 0){
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(res => {
      this.visibilidadeTabela = true;
      this.visibilidadeForm = false;
      alert('pessoa atualizada com sucesso.');
      this.pessoasService.PegarTodos().subscribe(result => {
      this.pessoas = result;
    });
      });
    }
    else{
    this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado => {
    this.visibilidadeTabela = true;
    this.visibilidadeForm = false;
    alert('pessoa inserida com sucesso.');
    this.pessoasService.PegarTodos().subscribe(result => {
      this.pessoas = result;
    });

    });
    }
  }

  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeForm = false;
  }

  ComfirmarExclusao(id: number, nome: string, conteudoMOdal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoMOdal)
    this.pessoaId = id;
    this.nomePessoa = nome;
  }

  ExcluirPessoa(id: number): void{
    this.pessoasService.DeletarPessoa(id).subscribe(res => {
      this.modalRef?.hide();
      alert('Pessoa excluida com sucesso.');
      this.pessoasService.PegarTodos().subscribe(result => {
        this.pessoas = result
      });
    });
  }

}
