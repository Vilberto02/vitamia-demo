import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export function ContainerInfo() {

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Información</CardTitle>
        <CardDescription>
          Aquí podrás visualizar consejos para llegar a tu meta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea></ScrollArea>
      </CardContent>
    </Card>
  );
}