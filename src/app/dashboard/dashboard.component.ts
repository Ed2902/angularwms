import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corregido "styleUrls"
})

export class DashboardComponent implements AfterViewInit {
  // Referencias a los canvas para los gráficos
  @ViewChild('mainChart', { static: true }) mainChart!: ElementRef;
  @ViewChild('chart1', { static: true }) chart1!: ElementRef;
  @ViewChild('chart2', { static: true }) chart2!: ElementRef;
  @ViewChild('chart3', { static: true }) chart3!: ElementRef;
  @ViewChild('chart4', { static: true }) chart4!: ElementRef;
  @ViewChild('chart5', { static: true }) chart5!: ElementRef;
  @ViewChild('chart6', { static: true }) chart6!: ElementRef;

  // Datos para las tablas
  tabla1 = [
    { name: 'Product A', value: '$123' },
    { name: 'Product B', value: '$456' },
    { name: 'Product C', value: '$789' },
  ];

  tabla2 = [
    { name: 'Category 1', quantity: 30 },
    { name: 'Category 2', quantity: 50 },
    { name: 'Category 3', quantity: 20 },
  ];

  tabla3 = [
    { description: 'Task 1', status: 'Completed' },
    { description: 'Task 2', status: 'In Progress' },
    { description: 'Task 3', status: 'Pending' },
  ];

  tabla4 = [
    { target: 'Sales', percentage: '65%' },
    { target: 'Profiles', percentage: '22%' },
    { target: 'Tickets', percentage: '83%' },
  ];

  constructor() {
    // Registro de los módulos de Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createMainChart();
    this.createSecondaryCharts();
  }

  // Crear el gráfico principal
  createMainChart(): void {
    new Chart(this.mainChart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Meta',
            data: [30, 40, 50, 60, 70, 80, 90],
            borderColor: '#007BFF', // Azul principal
            backgroundColor: 'rgba(251, 253, 255, 0.7)', // Azul menos transparente
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Rendimiento',
            data: [20, 30, 40, 50, 60, 70, 80],
            borderColor: '#ED8020', // Naranja principal
            backgroundColor: 'rgba(242, 115, 4, 0.96)', // Naranja menos transparente
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Crear los gráficos secundarios
  createSecondaryCharts(): void {
    const chartConfigs = [
      { element: this.chart1.nativeElement, type: 'bar', label: 'Bar Chart' },
      { element: this.chart2.nativeElement, type: 'pie', label: 'Pie Chart' },
      { element: this.chart3.nativeElement, type: 'radar', label: 'Radar Chart' },
      { element: this.chart4.nativeElement, type: 'doughnut', label: 'Doughnut Chart' },
      { element: this.chart5.nativeElement, type: 'polarArea', label: 'Polar Area Chart' },
      { element: this.chart6.nativeElement, type: 'line', label: 'Line Chart' },
    ];

    chartConfigs.forEach((config, index) => {
      new Chart(config.element.getContext('2d'), {
        type: config.type as any,
        data: {
          labels: ['A', 'B', 'C', 'D', 'E'],
          datasets: [
            {
              label: config.label,
              data: [10, 20, 30, 40, 50],
              backgroundColor: [
                'rgba(0, 128, 128, 0.7)', // Azul turquesa oscuro
                'rgba(32, 178, 170, 0.7)', // Verde agua marina
                'rgba(72, 209, 204, 0.7)', // Turquesa medio
                'rgba(127, 255, 212, 0.7)', // Aguamarina claro
                'rgba(175, 238, 238, 0.7)', // Azul pálido agua marina
                'rgba(0, 139, 139, 0.7)', // Verde azulado oscuro
                'rgba(64, 224, 208, 0.7)', // Turquesa brillante
            ],            
              borderColor: '#fff',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        },
      });
    });
  }
}
