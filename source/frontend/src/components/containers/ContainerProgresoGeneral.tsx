import BarChart from "../charts/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerProgresoGeneral() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Mi progreso</CardTitle>
        <CardDescription>
          Aquí podrás visualizar tu progreso en la formación de un hábito de
          alimentación saludable.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-48">
        <BarChart></BarChart>
      </CardContent>
    </Card>
  );
}
