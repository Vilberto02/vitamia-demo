import { LineChart } from "../charts/LineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerProgresoPeso() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Progreso del peso</CardTitle>
        <CardDescription>Progreso de las variaciones de peso.</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          labels={["Ene", "Feb", "Mar", "Abr", "May"]}
          dataValues={[85, 83, 81.5, 79, 78]}
        />
      </CardContent>
    </Card>
  );
}
