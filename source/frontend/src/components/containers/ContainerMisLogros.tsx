import { misLogros } from "@/mocks/mocks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardLogro } from "../cards/CardLogro";

export function ContainerMisLogros() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis logros</CardTitle>
        <CardDescription className="line-clamp-1">
          Aquí podrías visualizar tus logros completados.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-48">
        <ScrollArea className="">
          <div className="flex flex-col gap-3 pr-3">
            {misLogros.map((logro) => (
              <CardLogro
                key={logro.id}
                title={logro.title}
                description={logro.description}
                isCompleted={true}
              ></CardLogro>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
