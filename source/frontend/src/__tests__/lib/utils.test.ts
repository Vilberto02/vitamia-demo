import { unidadesMedida } from "@/lib/constants";
import {
  getNutritionalInfoById,
  getTagColorClass,
  getUnidadById,
} from "@/lib/utils";

describe("getTagColorClass", () => {
  it("Devuelve un color especifico para la categoria bajar de peso", () => {
    const mockCategoria = "Bajar de peso";
    expect(getTagColorClass(mockCategoria)).toEqual(
      "border-green-600 text-green-600",
    );
  });

  it("Devuelve un color especifico para la categoria masa muscular", () => {
    const mockCategoria = "Masa muscular";
    expect(getTagColorClass(mockCategoria)).toEqual(
      "border-yellow-600 text-yellow-600",
    );
  });

  it("Devuelve un color especifico para la categoria mediterranea", () => {
    const mockCategoria = "Mediterránea";
    expect(getTagColorClass(mockCategoria)).toEqual(
      "border-amber-900 text-amber-900",
    );
  });

  it("Devuelve un color especifico para la categoria bajo en azucar", () => {
    const mockCategoria = "Bajo en azúcar";
    expect(getTagColorClass(mockCategoria)).toEqual(
      "border-teal-600 text-teal-600",
    );
  });
});

describe("getUnidadById", () => {
  it("Devuelve una unidad por id", () => {
    const mockId = "1";
    expect(getUnidadById(mockId)).toEqual(unidadesMedida[0]);
  });
});

describe("getNutritionalInfoById", () => {
  it("Devuelve una lista de candidatos por categoria", () => {
    const mockId = 1;
    expect(getNutritionalInfoById(mockId)).toEqual(unidadesMedida[0]);
  });
});
