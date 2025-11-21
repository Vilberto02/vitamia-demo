import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ContainerPreferencias() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Preferencias alimentarias</CardTitle>
        <CardDescription>Alimentos que comúnmente ingieres.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
