import { useEffect, useRef } from "react";
import Chart, { ChartItem } from "chart.js/auto";

export function useWeightChart(weightData: { date: string; weight: number }[]) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current) {
      const chartInstance = new Chart(canvasRef.current as ChartItem, {
        type: "line",
        data: {
          labels: weightData.map((entry) => entry.date),
          datasets: [
            {
              label: "Weight",
              data: weightData.map((entry) => entry.weight),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });

      chartRef.current = chartInstance;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weightData]);

  return canvasRef;
}
