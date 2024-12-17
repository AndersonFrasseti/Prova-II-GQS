const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models/database");
const { Produto } = require("../models/produto");
const { Categoria } = require("../models/categoria");
const { Estoque } = require("../models/estoque");

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const categoria = await Categoria.create({ nome: "Eletrônicos" });
  const produto = await Produto.create({
    nome: "Celular",
    preco: 1200.0,
    quantidade: 50,
    categoriaId: categoria.id,
  });
  await Estoque.create({ produtoId: produto.id, quantidade: 50 });
});

afterAll(async () => {
  await sequelize.close();
});

const checkItemNotFound = (items, id) =>
  items.find((item) => item.id === id) === undefined;

// Suite de testes para Categoria
describe("Módulo Categoria", () => {
  let categoriaId;

  test("Deve criar uma nova categoria", async () => {
    const response = await request(app)
      .post("/api/categoria")
      .send({ nome: "Eletrônicos" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Eletrônicos");
    categoriaId = response.body.id;
  });

  test("Deve listar todas as categorias", async () => {
    const response = await request(app).get("/api/categoria");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
  });

  test("Deve atualizar uma categoria existente", async () => {
    const response = await request(app)
      .put(`/api/categoria/${categoriaId}`)
      .send({ nome: "Eletrodomésticos" });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Eletrodomésticos");
  });

  test("Deve remover uma categoria existente", async () => {
    const response = await request(app).delete(`/api/categoria/${categoriaId}`);
    expect(response.status).toBe(204);

    const checkResponse = await request(app).get("/api/categoria");
    expect(checkItemNotFound(checkResponse.body, categoriaId)).toBeTruthy();
  });
});

// Suite de testes para Produto
describe("Módulo Produto", () => {
  let produtoId;
  let categoriaId;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/categoria")
      .send({ nome: "Informática" });
    categoriaId = response.body.id;
  });

  test("Deve criar um novo produto", async () => {
    const response = await request(app).post("/api/produto").send({
      nome: "Notebook",
      quantidade: 10,
      preco: 5000,
      categoriaId,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Notebook");
    produtoId = response.body.id;
  });

  test("Deve listar todos os produtos", async () => {
    const response = await request(app).get("/api/produto");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Deve atualizar um produto existente", async () => {
    const response = await request(app)
      .put(`/api/produto/${produtoId}`)
      .send({ nome: "Laptop", quantidade: 15 });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Laptop");
  });

  test("Deve remover um produto existente", async () => {
    const response = await request(app).delete(`/api/produto/${produtoId}`);
    expect(response.status).toBe(204);

    const checkResponse = await request(app).get("/api/produto");
    expect(checkItemNotFound(checkResponse.body, produtoId)).toBeTruthy();
  });
});

// Suite de testes para Estoque
describe("Módulo Estoque", () => {
  let estoqueId;
  let produtoId;

  beforeAll(async () => {
    const response = await request(app).post("/api/produto").send({
      nome: "Teclado",
      quantidade: 50,
      preco: 200,
      categoriaId: 1,
    });
    produtoId = response.body.id;
  });

  test("Deve criar um registro de estoque", async () => {
    const response = await request(app)
      .post("/api/estoque")
      .send({ produtoId, quantidade: 20 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    estoqueId = response.body.id;
  });

  test("Deve listar todos os registros de estoque", async () => {
    const response = await request(app).get("/api/estoque");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Deve atualizar um registro de estoque", async () => {
    const response = await request(app)
      .put(`/api/estoque/${estoqueId}`)
      .send({ quantidade: 30 });

    expect(response.status).toBe(200);
    expect(response.body.quantidade).toBe(30);
  });

  test("Deve remover um registro de estoque", async () => {
    const response = await request(app).delete(`/api/estoque/${estoqueId}`);
    expect(response.status).toBe(204);

    const checkResponse = await request(app).get("/api/estoque");
    expect(checkItemNotFound(checkResponse.body, estoqueId)).toBeTruthy();
  });
});
