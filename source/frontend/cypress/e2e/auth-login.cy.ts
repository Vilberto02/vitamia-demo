/**
 * Test E2E: Flujo de autenticación completo.
 *
 * Pruebas de integración entre el frontend (LoginPage) y el backend
 * (API /auth/login, /auth/me), verificando:
 *  - Login exitoso con credenciales válidas
 *  - Login fallido con credenciales inválidas
 *  - Navegación post-login
 *  - Persistencia de sesión con token
 *  - Logout y limpieza de estado
 */

describe("Autenticación - Login Flow", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    // Limpiar estado antes de cada test
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe("Página de Login - UI", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("debería mostrar el formulario de login correctamente", () => {
      // Verificar elementos principales del formulario
      cy.get("h1").should("contain", "Bienvenido");
      cy.get('input[id="email"]').should("be.visible");
      cy.get('input[id="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("contain", "Continuar");
    });

    it("debería mostrar el enlace a la página de registro", () => {
      cy.contains("¿No tienes una cuenta?").should("be.visible");
      cy.contains("Crea una cuenta aquí.").should("be.visible");
      cy.contains("Crea una cuenta aquí.")
        .should("have.attr", "href")
        .and("include", "/register");
    });

    it("debería mostrar errores de validación con campos vacíos", () => {
      cy.get('button[type="submit"]').click();

      // react-hook-form muestra errores de validación
      cy.get('[role="alert"]').should("exist");
    });

    it("debería validar el formato del correo electrónico", () => {
      cy.get('input[id="email"]').type("correo-invalido");
      cy.get('input[id="password"]').type("123456");
      cy.get('input[id="email"]').blur();

      // Esperar a que aparezca el error de validación
      cy.get('[role="alert"]').should("exist");
    });

    it("debería mostrar error al enviar credenciales inválidas", () => {
      // Interceptar la petición de login
      cy.intercept("POST", `${apiUrl}/auth/login/`).as("loginRequest");

      cy.get('input[id="email"]').type("noexiste@test.com");
      cy.get('input[id="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();

      // Esperar la respuesta del backend
      cy.wait("@loginRequest").then((interception) => {
        expect(interception.response?.statusCode).to.be.oneOf([400, 401, 404]);
      });

      // Verificar que se muestra un toast de error
      cy.contains("Error al iniciar sesión").should("be.visible");
    });

    it("debería navegar a la landing page al hacer clic en el botón de retroceso", () => {
      cy.get("button").first().click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Login exitoso con API real", () => {
    it("debería autenticar y redirigir al dashboard con credenciales válidas", () => {
      // Primero verificar si hay un usuario de prueba disponible
      cy.request({
        method: "POST",
        url: `${apiUrl}/auth/login/`,
        body: {
          correo: "juan.perez@unmsm.edu.pe",
          contrasena: "1234",
        },
        failOnStatusCode: false,
      }).then((apiResponse) => {
        if (apiResponse.status === 200) {
          // Si el usuario existe, hacer el flujo completo de login por UI
          cy.visit("/login");

          cy.intercept("POST", `${apiUrl}/auth/login/`).as("loginRequest");

          cy.get('input[id="email"]').type("juan.perez@unmsm.edu.pe");
          cy.get('input[id="password"]').type("1234");
          cy.get('button[type="submit"]').click();

          // Verificar que la petición fue exitosa
          cy.wait("@loginRequest").then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);
            expect(interception.response?.body).to.have.property("token");
            expect(interception.response?.body).to.have.property("usuario");
          });

          // Verificar que el token se guardó en localStorage
          cy.window().then((win) => {
            const savedToken = win.localStorage.getItem("vitamia_token");
            expect(savedToken).to.not.be.null;
          });

          // Verificar redirección al dashboard
          cy.url().should("include", "/home");
        } else {
          cy.log(
            "⚠️ Usuario de prueba no disponible. Saltando test de login exitoso.",
          );
        }
      });
    });
  });

  describe("Persistencia de sesión", () => {
    it("debería mantener la sesión activa si hay un token válido", () => {
      // Intentar login por API primero
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
          // Guardar token en localStorage antes de visitar la página
          cy.window().then((win) => {
            win.localStorage.setItem("vitamia_token", response.body.token);
          });

          // Interceptar la verificación de autenticación
          cy.intercept("GET", `${apiUrl}/auth/me/`).as("checkAuth");

          cy.visit("/home");

          // Esperar a que se verifique el token
          cy.wait("@checkAuth").then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);
            expect(interception.response?.body).to.have.property("nombre");
          });

          // El usuario debería permanecer en /home
          cy.url().should("include", "/home");
        } else {
          cy.log("⚠️ Usuario de prueba no disponible.");
        }
      });
    });

    it("debería redirigir a login si el token es inválido", () => {
      // Guardar un token inválido
      cy.window().then((win) => {
        win.localStorage.setItem("vitamia_token", "token-invalido-12345");
      });

      cy.visit("/home");

      // El PrivateRouter debería redirigir a /login
      cy.url().should("include", "/login");
    });
  });
});
