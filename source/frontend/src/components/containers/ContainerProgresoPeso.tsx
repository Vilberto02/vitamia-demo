import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerProgresoPeso() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Progreso del peso</CardTitle>
        <CardDescription>Progreso de las variaciones de peso.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
