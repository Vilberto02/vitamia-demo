import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


type LineChartProps = {
  labels?: string[];
  dataValues?: number[];
}

export function LineChart({
  labels = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
  dataValues = [0, 0, 0, 0],
}: LineChartProps) {
  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Peso (kg)",
        data: dataValues,
        borderColor: "#10b981",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)");
          return gradient;
        },
        tension: 0.4, // Curvatura de la línea (0: recta, 0.4: suave)
        fill: true, // Rellenar el área bajo la línea
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#10b981",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda
      },
      tooltip: {
        backgroundColor: "#1f2937",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 13, weight: "bold" },
        displayColors: false, // Quita el cuadradito de color en el tooltip
        callbacks: {
          label: (context) => `${context.parsed.y} kg`, // Formato del tooltip
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ocultar líneas verticales de la grilla
        },
        ticks: {
          color: "#6b7280", // Color gris de los textos
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: "#f3f4f6", // Líneas horizontales
        },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
        },
        border: {
          display: false, // Ocultar la línea del eje Y
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}