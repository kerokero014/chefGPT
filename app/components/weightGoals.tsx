import { useWeightChart } from "../hooks/useWeightChart";
import "../style/styles.css";

interface WeightGoalsProps {
  weightGoal: number;
  weightData: { date: string; weight: number }[];
}

export default function WeightGoals({
  weightGoal,
  weightData,
}: WeightGoalsProps) {
  const canvasRef = useWeightChart(weightData);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Weight Goals</h2>
      <p>Goal: {weightGoal} kg</p>
      <canvas ref={canvasRef} className="weight-chart" />
    </div>
  );
}
