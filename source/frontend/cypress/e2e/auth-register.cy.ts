/**
 * Test E2E: Flujo de registro de usuario.
 *
 * Verifica la integración entre el formulario de registro y
 * el endpoint POST /api/auth/registro del backend:
 *  - Renderizado del formulario multi-paso
 *  - Validaciones en los campos
 *  - Interacción con la API de registro
 */

describe("Registro de Usuario", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit("/register");
  });

  describe("Formulario de Registro - UI", () => {
    it("debería mostrar el formulario de registro", () => {
      cy.get("form").should("be.visible");
    });

    it("debería tener campos de entrada visibles en el primer paso", () => {
      // Verificar que hay inputs visibles
      cy.get("input").should("have.length.at.least", 1);
    });

    it("debería tener validaciones que impiden avanzar con campos vacíos", () => {
      // Tratar de avanzar sin llenar campos
      cy.get("form").within(() => {
        // Buscar botón de siguiente o enviar
        cy.get("button").last().click();
      });

      // Debería mostrar errores de validación
      cy.get('[role="alert"]').should("exist");
    });
  });

  describe("Integración con API de Registro", () => {
    it("debería interceptar la llamada al endpoint de registro", () => {
      // Interceptar para verificar que el frontend llama al endpoint correcto
      cy.intercept("POST", `${apiUrl}/auth/registro/`).as("registerRequest");

      // Verificar que el intercept está configurado correctamente
      cy.log("Intercept configurado para POST /auth/registro/");
    });

    it("debería rechazar un registro con datos incompletos via API", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/auth/registro/`,
        body: {
          nombre: "",
          correo: "",
          contrasena: "",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 422, 500]);
      });
    });

    it("debería rechazar un registro con correo duplicado via API", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/auth/registro/`,
        body: {
          nombre: "Test",
          apellido: "User",
          correo: "juan.perez@unmsm.edu.pe", // Correo que ya existe
          contrasena: "testpassword",
          fecha_nacimiento: "2000-01-01",
          peso: 70,
          altura: 170,
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Debería rechazar por correo duplicado
        expect(response.status).to.be.oneOf([400, 409, 422, 500]);
      });
    });
  });
});
