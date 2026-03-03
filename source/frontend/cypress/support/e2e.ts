// ***********************************************************
// Cypress E2E Support File
// Este archivo se carga automáticamente antes de cada spec.
// ***********************************************************

// Comando personalizado para login via API (bypass UI)
Cypress.Commands.add("loginByApi", (correo: string, contrasena: string) => {
  const apiUrl = Cypress.env("apiUrl");

  cy.request({
    method: "POST",
    url: `${apiUrl}/auth/login/`,
    body: { correo, contrasena },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200 && response.body.token) {
      window.localStorage.setItem("vitamia_token", response.body.token);
    }
  });
});

// Comando para limpiar el estado de autenticación
Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("vitamia_token");
});

// Comando para interceptar y verificar llamadas a la API
Cypress.Commands.add(
  "interceptApi",
  (method: string, endpoint: string, alias: string) => {
    const apiUrl = Cypress.env("apiUrl");
    cy.intercept(method, `${apiUrl}${endpoint}`).as(alias);
  },
);
