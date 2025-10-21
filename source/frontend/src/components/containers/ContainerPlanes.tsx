import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export function ContainerPlanes() {
  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Lista de planes</CardTitle>
        <CardDescription>
          Aquí podrás visualizar combinaciones de alimentos para llegar a tu
          meta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea></ScrollArea>
      </CardContent>
    </Card>
  );
}