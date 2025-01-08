import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActividadesService } from '../services/actividades.service';

interface HistorialActividad {
  id_historial: number;
  id_asignacion: string;
  id_maestro: string;
  id_usuario: string;
  nombre_actividad: string;
  nombre_usuario: string;
  estado: string;
  hora_inicio: string | null;
  hora_fin: string | null;
  duracion: number | null;
  observaciones: string;
  fecha_modificacion: string;
}

interface ResumenUsuario {
  usuario: string;
  totalActividades: number;
  totalDuracion: number;
}

@Component({
  selector: 'app-historial',
  standalone: false,
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit, AfterViewInit {
  historial: HistorialActividad[] = [];
  resumenPorUsuario: ResumenUsuario[] = [];
  actividadesPorEstado: { estado: string; total: number }[] = [];
  historialFiltrado: HistorialActividad[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  graficos: { [key: string]: Chart | null } = {};

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.crearGraficos(), 0); // Inicializa gráficos tras cargar la vista
  }

  cargarHistorial(): void {
    this.actividadesService.obtenerHistorial().subscribe(
      (data: HistorialActividad[]) => {
        this.historial = data.map((actividad) => ({
          ...actividad,
          duracion: this.calcularDuracion(actividad.hora_inicio, actividad.hora_fin),
        }));
        this.historialFiltrado = [...this.historial]; // Inicialmente, muestra todo el historial
        this.generarTablas();
        this.actualizarGraficos();
      },
      (error) => {
        console.error('Error al cargar historial:', error);
      }
    );
  }

  calcularDuracion(horaInicio: string | null, horaFin: string | null): number | null {
    if (!horaInicio || !horaFin) return null;
    const inicio = new Date(`1970-01-01T${horaInicio}`).getTime();
    const fin = new Date(`1970-01-01T${horaFin}`).getTime();
    return Math.max((fin - inicio) / (1000 * 60), 0); // Aseguramos que no sea negativo
  }

  generarTablas(): void {
    // Resumen por usuario
    const resumen: { [key: string]: ResumenUsuario } = {};
    this.historialFiltrado.forEach((actividad) => {
      const usuario = actividad.nombre_usuario;
      if (!resumen[usuario]) {
        resumen[usuario] = { usuario, totalActividades: 0, totalDuracion: 0 };
      }
      resumen[usuario].totalActividades++;
      resumen[usuario].totalDuracion += actividad.duracion || 0;
    });
    this.resumenPorUsuario = Object.values(resumen);

    // Actividades por estado
    const estados: { [key: string]: { estado: string; total: number } } = {};
    this.historialFiltrado.forEach((actividad) => {
      const estado = actividad.estado;
      if (!estados[estado]) {
        estados[estado] = { estado, total: 0 };
      }
      estados[estado].total++;
    });
    this.actividadesPorEstado = Object.values(estados);
  }

  filtrarPorFechas(): void {
    if (this.fechaInicio && this.fechaFin) {
      const inicio = new Date(this.fechaInicio).getTime();
      const fin = new Date(this.fechaFin).getTime();

      this.historialFiltrado = this.historial.filter((actividad) => {
        const fechaActividad = new Date(actividad.fecha_modificacion).getTime();
        return fechaActividad >= inicio && fechaActividad <= fin;
      });
    } else {
      this.historialFiltrado = [...this.historial]; // Si no hay filtro, mostrar todo
    }

    this.generarTablas();
    this.actualizarGraficos();
  }

  crearGraficos(): void {
    this.graficos['actividadesPorDia'] = this.crearGrafico(
      'graficoActividadesPorDia',
      'bar',
      'Actividades por Día'
    );

    this.graficos['duracionPromedio'] = this.crearGrafico(
      'graficoDuracionPromedio',
      'line',
      'Duración Promedio'
    );

    this.graficos['actividadesPorUsuario'] = this.crearGrafico(
      'graficoActividadesPorUsuario',
      'pie',
      'Actividades por Usuario'
    );

    this.graficos['estadosActividades'] = this.crearGrafico(
      'graficoEstadosActividades',
      'doughnut',
      'Distribución por Estado'
    );
  }

  crearGrafico(id: string, tipo: string, label: string): Chart | null {
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    if (!ctx) return null;
    return new Chart(ctx, {
      type: tipo as any,
      data: {
        labels: [],
        datasets: [
          {
            label: label,
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });
  }

  actualizarGraficos(): void {
    this.actualizarGraficoPorDia();
    this.actualizarGraficoPromedio();
    this.actualizarGraficoPorUsuario();
    this.actualizarGraficoPorEstado();
  }

  actualizarGraficoPorDia(): void {
    if (this.graficos['actividadesPorDia']) {
      const actividadesPorDia = this.historialFiltrado.reduce((acc, actividad) => {
        const fecha = new Date(actividad.fecha_modificacion).toLocaleDateString();
        acc[fecha] = (acc[fecha] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      this.actualizarGrafico(
        this.graficos['actividadesPorDia'],
        Object.keys(actividadesPorDia),
        Object.values(actividadesPorDia)
      );
    }
  }

  actualizarGraficoPromedio(): void {
    if (this.graficos['duracionPromedio']) {
      const duracionPromedio = this.historialFiltrado.reduce((acc, actividad) => {
        const fecha = new Date(actividad.fecha_modificacion).toLocaleDateString();
        if (!acc[fecha]) acc[fecha] = [];
        acc[fecha].push(actividad.duracion || 0);
        return acc;
      }, {} as { [key: string]: number[] });

      const labels = Object.keys(duracionPromedio);
      const data = labels.map(
        (fecha) =>
          duracionPromedio[fecha].reduce((sum, dur) => sum + dur, 0) /
          duracionPromedio[fecha].length
      );

      this.actualizarGrafico(this.graficos['duracionPromedio'], labels, data);
    }
  }

  actualizarGraficoPorUsuario(): void {
    if (this.graficos['actividadesPorUsuario']) {
      const actividadesPorUsuario = this.resumenPorUsuario.map((resumen) => ({
        usuario: resumen.usuario,
        total: resumen.totalActividades,
      }));

      this.actualizarGrafico(
        this.graficos['actividadesPorUsuario'],
        actividadesPorUsuario.map((u) => u.usuario),
        actividadesPorUsuario.map((u) => u.total)
      );
    }
  }

  actualizarGraficoPorEstado(): void {
    if (this.graficos['estadosActividades']) {
      this.actualizarGrafico(
        this.graficos['estadosActividades'],
        this.actividadesPorEstado.map((e) => e.estado),
        this.actividadesPorEstado.map((e) => e.total)
      );
    }
  }

  actualizarGrafico(grafico: Chart, labels: string[], data: number[]): void {
    grafico.data.labels = labels;
    grafico.data.datasets[0].data = data;
    grafico.update();
  }
}
