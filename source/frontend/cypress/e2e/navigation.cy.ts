/**
 * Test E2E: Navegación y rutas de la aplicación.
 *
 * Verifica la integración del router con el backend:
 *  - Rutas públicas accesibles sin autenticación
 *  - Rutas privadas protegidas redirigen a login
 *  - Navegación entre páginas
 *  - Página 404 para rutas no existentes
 */

describe("Navegación y Rutas", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe("Rutas públicas", () => {
    it("debería cargar la Landing Page en la raíz '/'", () => {
      cy.visit("/");

      // Verificar elementos de la landing
      cy.contains("Tu nutrición, nuestro compromiso").should("be.visible");
      cy.contains("Comenzar ahora").should("be.visible");
      cy.contains("Iniciar Sesión").should("be.visible");
      cy.contains("Empezar").should("be.visible");
    });

    it("debería cargar la página de Login en '/login'", () => {
      cy.visit("/login");

      cy.get("h1").should("contain", "Bienvenido");
      cy.get('input[id="email"]').should("be.visible");
      cy.get('input[id="password"]').should("be.visible");
    });

    it("debería cargar la página de Registro en '/register'", () => {
      cy.visit("/register");

      // El componente Register debe ser visible
      cy.get("form").should("be.visible");
    });

    it("debería mostrar la página 404 para rutas inexistentes", () => {
      cy.visit("/ruta-que-no-existe", { failOnStatusCode: false });

      cy.contains("404").should("be.visible");
    });
  });

  describe("Rutas protegidas", () => {
    it("debería redirigir a /login al intentar acceder a /home sin autenticación", () => {
      cy.visit("/home");

      // El PrivateRouter debe redirigir a /login
      cy.url().should("include", "/login");
    });

    it("debería permitir acceso al dashboard con token válido", () => {
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

          cy.visit("/home");
          cy.url().should("include", "/home");

          // Verificar que se muestra el dashboard
          cy.get('[role="application"]').should("be.visible");
        } else {
          cy.log("⚠️ Usuario de prueba no disponible.");
        }
      });
    });
  });

  describe("Navegación desde la Landing Page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("debería navegar a /login al hacer clic en 'Iniciar Sesión'", () => {
      cy.contains("Iniciar Sesión").click();
      cy.url().should("include", "/login");
    });

    it("debería navegar a /register al hacer clic en 'Empezar'", () => {
      cy.contains("a", "Empezar").click();
      cy.url().should("include", "/register");
    });

    it("debería navegar a /register al hacer clic en 'Crear cuenta gratis'", () => {
      cy.contains("Crear cuenta gratis").click();
      cy.url().should("include", "/register");
    });

    it("debería navegar desde login a register por el enlace", () => {
      cy.visit("/login");
      cy.contains("Crea una cuenta aquí.").click();
      cy.url().should("include", "/register");
    });
  });
});
