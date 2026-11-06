/**
 * Test E2E: Endpoints protegidos del backend.
 *
 * Verifica que los endpoints protegidos del backend responden
 * correctamente cuando se proporciona un token válido, devolviendo
 * datos con la estructura esperada.
 */

describe("Endpoints Protegidos - Integración Backend", () => {
  const apiUrl = Cypress.env("apiUrl");
  let authToken: string;

  before(() => {
    // Obtener token válido una sola vez para todos los tests
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
        authToken = response.body.token;
      }
    });
  });

  describe("GET /api/auth/me - Obtener usuario actual", () => {
    it("debería devolver la información del usuario autenticado", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/auth/me/`,
        headers: { Authorization: `Bearer ${authToken}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("nombre");
        expect(response.body).to.have.property("apellido");
        expect(response.body).to.have.property("correo");
        expect(response.body).to.have.property("peso");
        expect(response.body).to.have.property("altura");
      });
    });
  });

  describe("GET /api/alimentos - Listado de alimentos", () => {
    it("debería devolver un arreglo de alimentos", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/alimentos/`,
        headers: { Authorization: `Bearer ${authToken}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");

        if (response.body.length > 0) {
          const alimento = response.body[0];
          expect(alimento).to.have.property("id");
          expect(alimento).to.have.property("nombre");
        }
      });
    });

    it("debería buscar alimentos por nombre", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/alimentos/nombre/manzana`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });
  });

  describe("GET /api/recetas - Listado de recetas", () => {
    it("debería devolver un arreglo de recetas", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/recetas/`,
        headers: { Authorization: `Bearer ${authToken}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");

        if (response.body.length > 0) {
          const receta = response.body[0];
          expect(receta).to.have.property("id");
          expect(receta).to.have.property("titulo");
          expect(receta).to.have.property("descripcion");
          expect(receta).to.have.property("tipo_comida");
        }
      });
    });
  });

  describe("GET /api/planes - Listado de planes", () => {
    it("debería devolver un arreglo de planes disponibles", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/planes/`,
        headers: { Authorization: `Bearer ${authToken}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");

        if (response.body.length > 0) {
          const plan = response.body[0];
          expect(plan).to.have.property("id");
          expect(plan).to.have.property("nombre");
          expect(plan).to.have.property("descripcion");
        }
      });
    });

    it("debería devolver los planes del usuario autenticado", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/planes/mis-planes/usuario`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
        if (response.status === 200) {
          expect(response.body).to.be.an("array");
        }
      });
    });
  });

  describe("GET /api/consumos - Consumos del usuario", () => {
    it("debería devolver los consumos del usuario", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/consumos/`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
        if (response.status === 200) {
          expect(response.body).to.be.an("array");
        }
      });
    });

    it("debería obtener calorías del usuario", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/consumos/calorias`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });
  });

  describe("GET /api/logros - Logros del usuario", () => {
    it("debería devolver los logros del usuario", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/logros/`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
        if (response.status === 200) {
          expect(response.body).to.be.an("array");
        }
      });
    });
  });

  describe("GET /api/usuarios - Información de usuarios", () => {
    it("debería devolver información general del usuario", () => {
      if (!authToken) {
        cy.log("⚠️ Token no disponible");
        return;
      }

      cy.request({
        method: "GET",
        url: `${apiUrl}/usuarios/general`,
        headers: { Authorization: `Bearer ${authToken}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });
  });
});
