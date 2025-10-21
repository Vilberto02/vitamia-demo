import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ContainerMotivacion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Mensajes de motivación</CardTitle>
      </CardHeader>
      <CardContent>
        <p>“La disciplina es recordar lo que quieres.”</p>
      </CardContent>
    </Card>
  );
}