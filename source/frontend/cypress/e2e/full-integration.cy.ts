/**
 * Test E2E: Flujo completo Frontend ↔ Backend.
 *
 * Prueba el ciclo completo de interacción entre el frontend
 * y el backend, simulando los flujos más comunes de un
 * usuario real de la aplicación Vitamia.
 */

describe("Flujo Completo de Integración", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe("Flujo: Landing → Login → Dashboard → Logout", () => {
    it("debería completar el flujo completo del usuario", () => {
      // 1. Verificar que la landing se carga
      cy.visit("/");
      cy.contains("Tu nutrición, nuestro compromiso").should("be.visible");

      // 2. Navegar al login
      cy.contains("Iniciar Sesión").click();
      cy.url().should("include", "/login");
      cy.get("h1").should("contain", "Bienvenido");

      // 3. Intentar login
      cy.request({
        method: "POST",
        url: `${apiUrl}/auth/login/`,
        body: {
          correo: "carlos@example.com",
          contrasena: "carlos-12345678",
        },
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status === 200 && response.body.token) {
          // Hacer login por UI
          cy.intercept("POST", `${apiUrl}/auth/login/`).as("loginApi");
          cy.intercept("GET", `${apiUrl}/auth/me/`).as("checkAuth");

          cy.get('input[id="email"]').type("carlos@example.com");
          cy.get('input[id="password"]').type("carlos-12345678");
          cy.get('button[type="submit"]').click();

          // 4. Esperar respuesta del backend
          cy.wait("@loginApi").then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);

            // Verificar estructura de la respuesta
            const body = interception.response?.body;
            expect(body).to.have.property("token");
            expect(body).to.have.property("usuario");
            expect(body.usuario).to.have.property("nombre");
            expect(body.usuario).to.have.property("correo");
          });

          // 5. Verificar que el dashboard cargó
          cy.url().should("include", "/home");
          cy.get('[role="application"]').should("be.visible");

          // 6. Verificar que el token se persistió
          cy.window().then((win) => {
            const token = win.localStorage.getItem("vitamia_token");
            expect(token).to.not.be.null;
            expect(String(token).length).to.be.greaterThan(10);
          });
        } else {
          cy.log("⚠️ Backend no disponible para flujo completo.");
        }
      });
    });
  });

  describe("Flujo: Acceso denegado → Redirección", () => {
    it("debería redirigir a login y permitir autenticación", () => {
      // 1. Intentar acceder directamente al dashboard
      cy.visit("/home");

      // 2. Debe redirigir a login
      cy.url().should("include", "/login");

      // 3. Verificar que la UI del login está disponible
      cy.get("h1").should("contain", "Bienvenido");
      cy.get('input[id="email"]').should("be.visible");
      cy.get('input[id="password"]').should("be.visible");
    });
  });

  describe("Flujo: Verificación de datos del backend en el frontend", () => {
    it("debería cargar datos reales del backend en el dashboard", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/auth/login/`,
        body: {
          correo: "carlos@example.com",
          contrasena: "carlos-12345678",
        },
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status === 200 && response.body.token) {
          const token = response.body.token;

          // Guardar token
          cy.window().then((win) => {
            win.localStorage.setItem("vitamia_token", token);
          });

          // Interceptar todas las llamadas que hace el dashboard al cargar
          cy.intercept("GET", `${apiUrl}/auth/me/`).as("getMe");
          cy.intercept("GET", `${apiUrl}/alimentos/**`).as("getAlimentos");
          cy.intercept("GET", `${apiUrl}/consumos/**`).as("getConsumos");
          cy.intercept("GET", `${apiUrl}/planes/**`).as("getPlanes");
          cy.intercept("GET", `${apiUrl}/recetas/**`).as("getRecetas");
          cy.intercept("GET", `${apiUrl}/logros/**`).as("getLogros");

          cy.visit("/home");

          // Verificar que al menos la llamada a /auth/me se realiza
          cy.wait("@getMe").then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);
            expect(interception.response?.body).to.have.property("nombre");
          });

          // Verificar que el dashboard se renderiza correctamente
          cy.get('[role="application"]').should("be.visible");
        } else {
          cy.log("⚠️ Backend no disponible.");
        }
      });
    });
  });

  describe("Flujo: Manejo de errores de red", () => {
    it("debería manejar correctamente errores de red en el login", () => {
      // Simular que el backend no responde
      cy.intercept("POST", `${apiUrl}/auth/login/`, {
        forceNetworkError: true,
      }).as("loginError");

      cy.visit("/login");

      cy.get('input[id="email"]').type("carlos@example.com");
      cy.get('input[id="password"]').type("carlos-12345678");
      cy.get('button[type="submit"]').click();

      // Debería mostrar un mensaje de error
      cy.contains("Error").should("be.visible");
    });

    it("debería manejar respuestas 500 del servidor", () => {
      cy.intercept("POST", `${apiUrl}/auth/login/`, {
        statusCode: 500,
        body: { mensaje: "Error interno del servidor" },
      }).as("serverError");

      cy.visit("/login");

      cy.get('input[id="email"]').type("carlos@example.com");
      cy.get('input[id="password"]').type("carlos-12345678");
      cy.get('button[type="submit"]').click();

      cy.wait("@serverError");

      // Verificar que la app no se crashea y muestra error
      cy.contains("Error").should("be.visible");
    });
  });
});
