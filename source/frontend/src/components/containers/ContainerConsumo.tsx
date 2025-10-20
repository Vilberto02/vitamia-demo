import BarChart from "../charts/BarChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


export function ContainerConsumo() {

  return (
    <>
      <Card className="h-72">
        <CardHeader>
          <CardTitle>Balance de consumo</CardTitle>
          <CardDescription>
            Aquí podrás visualizar un gráfico de barras de los alimentos que
            comúnmente ingieres.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>
    </>
  );
}
