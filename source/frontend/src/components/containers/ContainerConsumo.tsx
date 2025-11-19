import BarChart from "../charts/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerConsumo() {
  return (
    <>
      <Card className="grow">
        <CardHeader>
          <CardTitle>Balance de consumo</CardTitle>
          <CardDescription>
            Aquí podrás visualizar un gráfico de barras de los alimentos que
            comúnmente ingieres.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <BarChart />
        </CardContent>
      </Card>
    </>
  );
}
