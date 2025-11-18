// =============================================================
// BASE DE DATOS: tienda_accesorios
// AUTOR: Carlos Andrés Londoño Moscoso
// DESCRIPCIÓN: Script completo para inserción, consulta, 
// actualización, eliminación y agregación de datos.
// =============================================================

// Selección de la base de datos
use('tienda_accesorios');


// =============================================================
// COLECCIÓN: productos
// =============================================================

// Insertar productos iniciales , en total se insertaron 114 documentos para los cuales se deja la evidencia 
// en la imagen del documento final de entrega.

db.productos.insertMany([
  {
    nombre: "Anillo de plata",
    categoria: "Joyas",
    precio: 95000,
    stock: 25,
    material: "Plata 925",
    color: "Plateado",
    descripcion: "Anillo artesanal de plata 925 con acabado brillante."
  },
  {
    nombre: "Anillo de oro",
    categoria: "Joyas",
    precio: 105000,
    stock: 15,
    material: "Oro 18k",
    color: "Amarillo",
    descripcion: "Anillo de oro 18k ajustable, diseño clásico."
  },
  {
    nombre: "Collar de perlas",
    categoria: "Joyas",
    precio: 120000,
    stock: 12,
    material: "Perlas naturales",
    color: "Blanco",
    descripcion: "Collar elegante de perlas naturales con cierre de plata."
  }
]);


// Consultar todos los productos
db.productos.find();


// Consultar productos con stock menor a 20
db.productos.find({ stock: { $lt: 20 } });


// =============================================================
// ACTUALIZAR EL STOCK DE UN PRODUCTO
// =============================================================
// Descripción: permite modificar la cantidad disponible en inventario.
// Usado para entradas de mercancía o corrección de inventarios.
db.productos.updateOne(
  { nombre: "Anillo de plata" },   // Filtro de búsqueda
  { $set: { stock: 30 } }          // Actualización del campo
);


// =============================================================
// ELIMINAR UN PRODUCTO
// =============================================================
// Descripción: elimina un producto del catálogo. 
// Usado cuando un artículo está descatalogado o agotado definitivamente.
// NOTA: "Pulsera de cuero" no existe en la inserción inicial, 
// pero se deja como ejemplo instructivo.
db.productos.deleteOne({
  nombre: "Pulsera de cuero"
});


// =============================================================
// CONTAR EL TOTAL DE PRODUCTOS
// =============================================================
// Descripción: etapa de agregación que devuelve cuántos productos 
// hay registrados en la colección.
db.productos.aggregate([
  { $count: "total_productos" }
]);


// =============================================================
// COLECCIÓN: clientes
// =============================================================

// Insertar clientes
db.clientes.insertMany([
  {
    nombre: "María López",
    correo: "maria.lopez@gmail.com",
    telefono: "3112345678",
    ciudad: "Bogotá"
  },
  {
    nombre: "Carlos Pérez",
    correo: "carlos.perez@hotmail.com",
    telefono: "3009876543",
    ciudad: "Medellín"
  },
  {
    nombre: "Ana Rodríguez",
    correo: "ana.rodriguez@yahoo.com",
    telefono: "3124567890",
    ciudad: "Cali"
  }
]);

// Consultar todos los clientes
db.clientes.find();

// Buscar cliente por ciudad
db.clientes.find({ ciudad: "Bogotá" });

// Actualizar teléfono de cliente
db.clientes.updateOne(
  { nombre: "Carlos Pérez" },
  { $set: { telefono: "3000000000" } }
);

// Contar clientes
db.clientes.aggregate([
  { $count: "total_clientes" }
]);


// =============================================================
// COLECCIÓN: pedidos
// =============================================================

// Insertar pedidos
db.pedidos.insertMany([
  {
    cliente: "María López",
    fecha: new Date("2025-11-10"),
    total: 185000,
    estado: "Enviado",
    productos: [
      { nombre: "Anillo de plata", cantidad: 1 },
      { nombre: "Collar de perlas", cantidad: 1 }
    ]
  },
  {
    cliente: "Carlos Pérez",
    fecha: new Date("2025-11-09"),
    total: 105000,
    estado: "Pendiente",
    productos: [
      { nombre: "Anillo de oro", cantidad: 1 }
    ]
  }
]);

// Consultar todos los pedidos
db.pedidos.find();

// Buscar pedidos por estado
db.pedidos.find({ estado: "Enviado" });

// Actualizar estado de un pedido
db.pedidos.updateOne(
  { cliente: "Carlos Pérez" },
  { $set: { estado: "Entregado" } }
);

// Contar pedidos
db.pedidos.aggregate([
  { $count: "total_pedidos" }
]);


// Obtener valor total de ventas
db.pedidos.aggregate([
  {
    $group: {
      _id: null,
      valor_total_ventas: { $sum: "$total" }
    }
  }
]);


// =============================================================
// FIN DEL SCRIPT
// =============================================================
