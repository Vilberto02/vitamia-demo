import type { LucideIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type AlimentoDiarioItemType = {
  name: string;
  Icon: LucideIcon;
}

type ListaUnidadesTypes = {
  id: string;
  name: string;
}

const listaUnidadesMedida: ListaUnidadesTypes[] = [
  {
    id: "gramos",
    name: "Gramos",
  },
  {
    id: "unidad",
    name: "Unidad",
  },
  {
    id: "lata",
    name: "Lata",
  },
  {
    id: "vaso",
    name: "Vaso",
  },
];


export function AlimentoDiarioItem({ name, Icon }: AlimentoDiarioItemType) {
  return (
    <div className="flex justify-between items-center mb-2 flex-wrap gap-4 py-2">
      <div className="flex items-center gap-2">
        <Icon className="text-[var(--bg-turquesa)]/80"></Icon>
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-2 pl-1">
        <Input
          type="text"
          placeholder="200"
          className="w-20 border rounded p-1 text-center grow"
        ></Input>
        <Select defaultValue={"gramos"}>
          <SelectTrigger className="min-w-[180px] grow" value={"gramos"}>
            <SelectValue placeholder="Unidad..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Unidades de medida</SelectLabel>
              {listaUnidadesMedida.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}