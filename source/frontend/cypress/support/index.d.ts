// Declaración de tipos para los comandos personalizados de Cypress

declare namespace Cypress {
  interface Chainable {
    /**
     * Login via API directamente, sin pasar por la UI.
     * Guarda el token en localStorage.
     */
    loginByApi(correo: string, contrasena: string): Chainable<void>;

    /**
     * Elimina el token de autenticación del localStorage.
     */
    logout(): Chainable<void>;

    /**
     * Intercepta una llamada a la API y le asigna un alias.
     */
    interceptApi(
      method: string,
      endpoint: string,
      alias: string,
    ): Chainable<void>;
  }
}
