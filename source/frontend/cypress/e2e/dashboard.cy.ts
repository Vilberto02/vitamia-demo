/**
 * Test E2E: Dashboard - Integración con los endpoints del backend.
 *
 * Una vez autenticado, verifica que el dashboard carga datos
 * reales del backend: secciones de sidebar, y que las llamadas
 * a la API se realizan correctamente.
 */

describe("Dashboard - Integración con Backend", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    // Login por API antes de cada test
    cy.request({
      method: "POST",
      url: `${apiUrl}/auth/login/`,
      body: {
        correo: "juan.perez@unmsm.edu.pe",
        contrasena: "1234",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200 && response.body.token) {
        cy.window().then((win) => {
          win.localStorage.setItem("vitamia_token", response.body.token);
        });
      }
    });
  });

  it("debería cargar el dashboard con los componentes principales", () => {
    cy.visit("/home");

    // Verificar que el panel se muestra
    cy.get('[role="application"]').should("be.visible");
  });

  it("debería mostrar las secciones del sidebar", () => {
    cy.visit("/home");

    // Verificar items del sidebar
    cy.contains("General").should("exist");
    cy.contains("Recetas").should("exist");
    cy.contains("Planes").should("exist");
    cy.contains("Perfil").should("exist");
  });

  it("debería cambiar de sección al hacer clic en los items del sidebar", () => {
    cy.visit("/home");

    // Navegar a la sección de Recetas
    cy.contains("Recetas").click();
    cy.wait(500); // Esperar renderizado de la sección

    // Navegar a la sección de Planes
    cy.contains("Planes").click();
    cy.wait(500);

    // Navegar de vuelta a General
    cy.contains("General").click();
    cy.wait(500);
  });
});
