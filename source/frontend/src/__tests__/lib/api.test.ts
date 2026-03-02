import { baseURL } from "@/api/api";

describe("api.ts - baseURL", () => {
  it("exporta la constante baseURL", () => {
    expect(baseURL).toBeDefined();
  });

  it("baseURL es una cadena de texto", () => {
    expect(typeof baseURL).toBe("string");
  });

  it("baseURL apunta al host correcto", () => {
    expect(baseURL).toBe("http://localhost:3001/api");
  });

  it("baseURL contiene el protocolo http", () => {
    expect(baseURL).toMatch(/^http/);
  });

  it("baseURL contiene el segmento '/api'", () => {
    expect(baseURL).toContain("/api");
  });

  it("baseURL contiene el puerto 3001", () => {
    expect(baseURL).toContain("3001");
  });

  it("baseURL no termina con barra diagonal", () => {
    expect(baseURL.endsWith("/")).toBe(false);
  });
});
