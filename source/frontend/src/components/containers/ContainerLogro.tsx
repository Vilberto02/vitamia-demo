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
          <ScrollArea className="h-28">
            <div className="flex flex-col gap-2 px-2">
              {logros.map((logro) => (
                <CardLogro
                  key={logro.id}
                  title={logro.title}
                  description={logro.description}
                ></CardLogro>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}