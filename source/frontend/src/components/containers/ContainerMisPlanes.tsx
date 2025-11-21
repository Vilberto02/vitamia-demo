import { misPlanes } from "@/mocks/mocks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { MoveUpRight } from "lucide-react";

export function ContainerMisPlanes() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Mis planes</CardTitle>
        <CardDescription>Planes asociados a tu perfil.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex flex-col gap-3 pr-3">
            {
            misPlanes.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between gap-4 cursor-pointer border border-verde-te/40 p-2 rounded-md bg-verde-te/10 hover:bg-verde-te/40">
                <p className="line-clamp-1 text-sm">{plan.title}</p>
                <MoveUpRight className="w-5 h-5 shrink-0 text-naranja"></MoveUpRight>
              </div>
            ))
          }</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
