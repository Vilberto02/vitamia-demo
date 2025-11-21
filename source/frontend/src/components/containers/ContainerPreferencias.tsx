import { DoughnutChart } from "../charts/DoghnutChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerPreferencias() {
  
  const colors = ["#DBAEFF", "#D0E8FF", "#FBE38E", "#A9F4D0"];
  const values = [100, 80, 40, 10];
  const labels = ["Frutas", "Verduras", "Carnes", "Huevos"];
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Preferencias alimentarias</CardTitle>
        <CardDescription>Alimentos que comúnmente ingieres.</CardDescription>
      </CardHeader>
      <CardContent >
        <DoughnutChart colors={colors} values={values} labels={labels} ></DoughnutChart>
      </CardContent>
    </Card>
  );
}
