/**
 * Test E2E: Verificación de que la API del backend está operativa.
 *
 * Estas pruebas validan la conectividad con el backend antes de
 * ejecutar otras pruebas de integración.
 */

describe("API Health Check - Conectividad Backend", () => {
  const apiUrl = Cypress.env("apiUrl");

  it("debería responder con status 200 en la raíz del servidor", () => {
    // La raíz del servidor (sin /api) devuelve { status: "ok" }
    const serverRoot = apiUrl.replace("/api", "");

    cy.request({
      method: "GET",
      url: serverRoot,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("status", "ok");
    });
  });

  it("debería rechazar un login con credenciales inválidas", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/login/`,
      body: {
        correo: "noexiste@test.com",
        contrasena: "wrongpassword",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });
  });

  it("debería rechazar acceso a /auth/me sin token", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/auth/me/`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it("debería rechazar acceso a endpoints protegidos sin token", () => {
    const protectedEndpoints = [
      { method: "GET", url: `${apiUrl}/alimentos/` },
      { method: "GET", url: `${apiUrl}/recetas/` },
      { method: "GET", url: `${apiUrl}/planes/` },
      { method: "GET", url: `${apiUrl}/logros/` },
      { method: "GET", url: `${apiUrl}/consumos/` },
      { method: "GET", url: `${apiUrl}/usuarios/` },
    ];

    protectedEndpoints.forEach((endpoint) => {
      cy.request({
        method: endpoint.method,
        url: endpoint.url,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
      });
    });
  });
});
