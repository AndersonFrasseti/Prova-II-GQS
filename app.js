const express = require("express");
const produtoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", produtoRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", estoqueRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = { app };
