CREATE DATABASE IF NOT EXISTS Supermercado;
USE Supermercado;

-- Categorías de productos --
CREATE TABLE Categoria (
    IdCategoria INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Proveedores --
CREATE TABLE Proveedor (
    IdProveedor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Telefono VARCHAR(20),
    Email VARCHAR(100),
    Direccion VARCHAR(200)
);

-- Productos --
CREATE TABLE Producto (
    IdProducto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    IdCategoria INT,
    IdProveedor INT,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria),
    FOREIGN KEY (IdProveedor) REFERENCES Proveedor(IdProveedor)
);

-- Usuarios (Empleados con roles) --
CREATE TABLE Usuario (
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Telefono VARCHAR(20),
    Rol ENUM('Administrador', 'Vendedor', 'Bodeguero') NOT NULL
);

-- Ventas --
CREATE TABLE Venta (
    IdVenta INT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario INT,
    Fecha DATE NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);

-- Detalle de Venta (productos vendidos en cada venta) --
CREATE TABLE DetalleVenta (
    IdDetalleVenta INT AUTO_INCREMENT PRIMARY KEY,
    IdVenta INT,
    IdProducto INT,
    Cantidad INT NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (IdVenta) REFERENCES Venta(IdVenta),
    FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto)
);

-- Inventario --
CREATE TABLE Inventario (
    IdInventario INT AUTO_INCREMENT PRIMARY KEY,
    IdProducto INT,
    StockMinimo INT NOT NULL,
    FechaActualizacion DATE NOT NULL,
    FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto)
);



alter table Usuario add column pass varchar(20);
alter table Usuario drop column pass;
alter table Usuario add column pass varchar(350);