import { logros } from "@/mocks/mocks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardLogro } from "../cards/CardLogro";

export function ContainerLogro(){

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Logros</CardTitle>
          <CardDescription>
            Aquí podrás visualizar tus logros completados.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full w-full">
          <ScrollArea className="h-full flex flex-col gap-4 px-2">
            {logros.map((logro) => (
              <CardLogro
                key={logro.id}
                title={logro.title}
                description={logro.description}
              ></CardLogro>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}