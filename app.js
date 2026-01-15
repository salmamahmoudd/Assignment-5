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
    connection.query(createSuppliers, (err, results) => {
        if (err) throw err;
        console.log('Suppliers table created.');

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
        connection.query(createProducts, (err, results) => {
            if (err) throw err;
            console.log('Products table created.');

            const createSales = `
                CREATE TABLE IF NOT EXISTS Sales (
                    SaleID INT PRIMARY KEY AUTO_INCREMENT,
                    ProductID INT,
                    QuantitySold INT,
                    SaleDate DATE,
                    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
                );
            `;
            connection.query(createSales, (err, results) => {
                if (err) throw err;
                console.log('Sales table created.');

                connection.end();
            });
        });
    });
});
