import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DashboardService } from '../dashboard.service';
import { CampanhaService } from '../../campanha/campanha.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FormularioService } from '../../formulario/formulario.service';
import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';

@Component({
  selector: 'app-dashboard-reposta',
  templateUrl: './dashboard-reposta.component.html',
  styleUrls: ['./dashboard-reposta.component.css']
})
export class DashboardRepostaComponent implements OnInit {

  respostaFormulario: Array<any> = [];
  nomePergunta: string;
  campanhas: any[];
  formularios: any[];
  perguntas = [];
  campanhaSelecionada: number;
  formularioSelecionado: number;
  optionsRespostas: any;

  constructor(
    private dashboardService: DashboardService,
    private campanhaService: CampanhaService,
    private formularioService: FormularioService,
    private errorService: ErrorHandlerService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Dashboard / Respostas');
    this.carregarCampanhas();
  }

  carregarCampanhas() {
    this.campanhaService.listarCampanha()
      .then(resultado => {
        this.campanhas = resultado.map(campanha => ({
          label: campanha.nome,
          value: campanha.id
        }));
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  carregarFormularios() {
    this.formularioSelecionado = undefined;
    this.campanhaService.pesquisarCampanhaPorId(this.campanhaSelecionada)
      .then(resultado => {
        this.formularios = resultado.formularios.map(formulario => ({
          label: formulario.nome,
          value: formulario.id
        }));
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  carregarPerguntasPorFormulario() {
    this.respostaFormulario = [];
    this.formularioService.pesquisarFormularioPorId(this.formularioSelecionado)
      .then(resultado => {
        this.perguntas = resultado.perguntas;
        for (let pergunta of this.perguntas) {
          if (pergunta.tipo === 'RespostaUnica' || pergunta.tipo === 'MultiplaEscolha') {
            this.carregarRespostasPorPergunta(this.campanhaSelecionada, this.formularioSelecionado, pergunta.id);
          }
        }
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  carregarRespostasPorPergunta(idCampanha: number, idFormulario: number, idPergunta: number) {
    this.dashboardService.respostasPorFormulario(idCampanha, idFormulario, idPergunta)
      .then(dados => {
        if (dados.length != 0) {
          this.nomePergunta = dados[0].pergunta.nome;
          this.respostaFormulario.push({
            title: this.nomePergunta,
            labels: dados.map(dado => dado.resposta),
            datasets: [
              {
                data: dados.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                  '#DD4477', '#3366CC', '#DC3912']
              }
            ]
          });
        }
      })
      .catch(erro => this.errorService.handle(erro)
      );

    this.optionsRespostas = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  }

  voltarDashboard() {
    this.router.navigate(['/dashboard']);
  }

}