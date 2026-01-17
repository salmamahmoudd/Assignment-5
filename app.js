const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',   
  database: 'retailstore'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to database.');

    const createSuppliers = `
        CREATE TABLE IF NOT EXISTS Suppliers (
            SupplierID INT PRIMARY KEY AUTO_INCREMENT,
            SupplierName VARCHAR(255),
            ContactNumber VARCHAR(15)
        );
    `;
    connection.query(createSuppliers);

    const createProducts = `
        CREATE TABLE IF NOT EXISTS Products (
            ProductID INT PRIMARY KEY AUTO_INCREMENT,
            ProductName VARCHAR(255) NOT NULL,
            Price DECIMAL(10,2),
            StockQuantity INT,
            SupplierID INT,
            FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
        );
    `;
    connection.query(createProducts);

    const createSales = `
        CREATE TABLE IF NOT EXISTS Sales (
            SaleID INT PRIMARY KEY AUTO_INCREMENT,
            ProductID INT,
            QuantitySold INT,
            SaleDate DATE,
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        );
    `;
    connection.query(createSales);

    const insertSupplier = `INSERT INTO Suppliers (SupplierName, ContactNumber)
                            VALUES ('FreshFoods', '01001234567')`;
    connection.query(insertSupplier);

    const insertProducts = `
        INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
        VALUES 
        ('Milk', 15.00, 50, 1),
        ('Bread', 10.00, 30, 1),
        ('Eggs', 20.00, 40, 1)
    `;
    connection.query(insertProducts);

    const insertSale = `INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
                        VALUES (1, 2, '2025-05-20')`;
    connection.query(insertSale);

    const updateBread = `UPDATE Products SET Price = 25 WHERE ProductName = 'Bread'`;
    connection.query(updateBread);

    const deleteEggs = `DELETE FROM Products WHERE ProductName = 'Eggs'`;
    connection.query(deleteEggs);



    connection.end();
});
