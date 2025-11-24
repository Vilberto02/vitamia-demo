import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { listaInformacion } from "@/mocks/mocks";

export function ContainerInfo() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Información</CardTitle>
        <CardDescription>
          Aquí podrás visualizar consejos para llegar a tu meta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="flex flex-col gap-3 pr-3">
            {listaInformacion.map((info) => (
              <div key={info.id} className="flex items-center gap-3">
                <div className="w-14 aspect-square rounded-full bg-turquesa flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-carbon-oscuro mb-1">
                    {info.title}
                  </h4>
                  <p className="text-sm text-gris-oscuro line-clamp-2">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
