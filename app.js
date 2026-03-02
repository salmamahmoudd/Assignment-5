const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "retailstore"
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to database.");
});

app.get("/suppliers", (req, res) => {
  connection.query("SELECT * FROM Suppliers", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.get("/suppliers/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Suppliers WHERE SupplierID = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (!results.length) return res.status(404).send({ message: "Supplier not found" });
      res.send(results[0]);
    }
  );
});

app.post("/suppliers", (req, res) => {
  const { SupplierName, ContactNumber } = req.body;
  if (!SupplierName || !ContactNumber)
    return res.status(400).send({ message: "All fields are required" });

  connection.query(
    "INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)",
    [SupplierName, ContactNumber],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Supplier added", id: result.insertId });
    }
  );
});

app.patch("/suppliers/:id", (req, res) => {
  const { id } = req.params;
  const { SupplierName, ContactNumber } = req.body;

  connection.query(
    "UPDATE Suppliers SET SupplierName = ?, ContactNumber = ? WHERE SupplierID = ?",
    [SupplierName, ContactNumber, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Supplier not found" });
      res.send({ message: "Supplier updated" });
    }
  );
});

app.delete("/suppliers/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Suppliers WHERE SupplierID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Supplier not found" });
      res.send({ message: "Supplier deleted" });
    }
  );
});

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM Products", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Products WHERE ProductID = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (!results.length) return res.status(404).send({ message: "Product not found" });
      res.send(results[0]);
    }
  );
});

app.post("/products", (req, res) => {
  const { ProductName, Price, StockQuantity, SupplierID } = req.body;
  if (!ProductName || Price == null || StockQuantity == null || !SupplierID)
    return res.status(400).send({ message: "All fields are required" });

  connection.query(
    "INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)",
    [ProductName, Price, StockQuantity, SupplierID],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Product added", id: result.insertId });
    }
  );
});

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const { ProductName, Price, StockQuantity, SupplierID } = req.body;

  connection.query(
    "UPDATE Products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?",
    [ProductName, Price, StockQuantity, SupplierID, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Product not found" });
      res.send({ message: "Product updated" });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Products WHERE ProductID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Product not found" });
      res.send({ message: "Product deleted" });
    }
  );
});

app.get("/sales", (req, res) => {
  connection.query("SELECT * FROM Sales", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.post("/sales", (req, res) => {
  const { ProductID, QuantitySold, SaleDate } = req.body;
  if (!ProductID || !QuantitySold || !SaleDate)
    return res.status(400).send({ message: "All fields are required" });

  connection.query(
    "INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)",
    [ProductID, QuantitySold, SaleDate],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Sale recorded", id: result.insertId });
    }
  );
});

app.patch("/sales/:id", (req, res) => {
  const { id } = req.params;
  const { ProductID, QuantitySold, SaleDate } = req.body;

  connection.query(
    "UPDATE Sales SET ProductID = ?, QuantitySold = ?, SaleDate = ? WHERE SaleID = ?",
    [ProductID, QuantitySold, SaleDate, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Sale not found" });
      res.send({ message: "Sale updated" });
    }
  );
});

app.delete("/sales/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Sales WHERE SaleID = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send({ message: "Sale not found" });
      res.send({ message: "Sale deleted" });
    }
  );
});


app.listen(port, () => console.log(`Server running on port ${port}`));