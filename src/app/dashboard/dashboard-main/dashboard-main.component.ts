import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  atendCampanha: any;
  atendUsuario: any;
  atendDia: any;

  optionsAtendUsuario: any;
  optionsAtendDia: any;

  constructor(
    private dashboardService: DashboardService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Dashboard');
    this.carregarAtendimentosPorCampanha();
    this.carregarAtendimentosPorUsuario();
    this.carregarAtendimentosPorDia();
  }

  carregarAtendimentosPorCampanha() {
    this.dashboardService.atendimentosPorCampanha()
      .then(dados => {
        this.atendCampanha = {
          labels: dados.map(dado => dado.campanha.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  carregarAtendimentosPorUsuario() {
    this.dashboardService.atendimentosPorUsuario()
      .then(dados => {
        this.atendUsuario = {
          labels: dados.map(dado => dado.usuario.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });

    this.optionsAtendUsuario = {
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: -50,
          right: -50,
          top: 0,
          bottom: 0
        }
      },
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  }

  carregarAtendimentosPorDia() {
    this.dashboardService.atendimentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();
        const totais = this.totaisPorCadaDiaMes(dados, diasDoMes);

        this.atendDia = {

          labels: diasDoMes,
          datasets: [
            {
              data: totais,
              backgroundColor: '#FF9900'
            }
          ]
        };
      });

    this.optionsAtendDia = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  }

  gerarCsvCompleto(){
    var opcoes = { 
      headers: ["ID", "Contato", "Campanha", "Cliente", "Formulario", "Usuario", "Data_Atendimento", "Pergunta", "Resposta"]
    };

    this.dashboardService.atendimentosCompleto()
      .then(dados => {
        new Angular5Csv(dados, 'CCP_Easy_Form_Atendimentos', opcoes);
      });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

  irGraficoRespostas() {
    this.router.navigate(['/dashboard-respostas']);
  }

}
