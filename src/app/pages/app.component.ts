
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../model/usuario';

const USUARIOS: Usuario[] = [
  {codigo:1, nome: "João", telefone:"3333-3333"}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  novoUsuario = new Usuario();

  formCadastrarUsuario =  new FormGroup({
    nome: new FormControl([Validators.required]),
    telefone: new FormControl([Validators.required])
  });
  constructor( private formBuilder: FormBuilder ) {
  }



  displayedColumns = [
    'codigo',
    'nome',
    'telefone',
    'acoes'
  ];
  //dataSource = [...USUARIOS];
  dataSource = new MatTableDataSource(USUARIOS);

  @ViewChild(MatTable)
  table!: MatTable<Usuario>;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  salvar(){
    if(this.formCadastrarUsuario.valid){
      const ultimoUsuario = this.dataSource.data[this.dataSource.data.length-1]
      if(ultimoUsuario == null){
        this.novoUsuario.codigo = 1
      }else{
        this.novoUsuario.codigo = ultimoUsuario.codigo + 1
      }
      this.dataSource.data.push(this.novoUsuario);
      this.dataSource._updateChangeSubscription()
      this.novoUsuario = new Usuario();
    }else{
      console.log("não valido")
    }
  }

  limpar(){
    this.formCadastrarUsuario.get("nome")?.setValue("");
  }

  excluir(user: Usuario){
    const index = this.dataSource.data.indexOf(user)

    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription()
    }
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
