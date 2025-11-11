# Proyecto: Tienda de Accesorios - Consultas MongoDB

## Auctor: Carlos Andres Londoño Moscoso

Este proyecto contiene las consultas básicas y de agregación utilizadas en la **Fase 4** del trabajo académico sobre bases de datos **NoSQL**, específicamente con **MongoDB**. Se basa en un caso de uso de una tienda online de accesorios y joyas.

---

## Descripción del proyecto
La base de datos **`tienda_accesorios`** gestiona información sobre productos, clientes y pedidos. Su diseño se centra en la flexibilidad del modelo documental de MongoDB, ideal para manejar datos semiestructurados como los de un catálogo de productos
con atributos variables (precio, color, material, stock, etc.).

---

## Requisitos previos
Antes de ejecutar las consultas, asegúrate de tener instalado:
- **MongoDB Server** o **MongoDB Compass**.
- **Visual Studio Code** (para editar o visualizar este archivo).

Crea o selecciona la base de datos `tienda_accesorios` y asegúrate de estar en la colección **`productos`** antes de ejecutar los comandos.

---

## Ejecución de las consultas
copiar y pegar cada bloque en la consola de **MongoDB Compass** o ejecutarlas desde el **Mongo Shell**.

---

## Consultas MongoDB

### 1. Inserción de datos
```javascript
db.productos.insertMany([
  { nombre: "Anillo de plata", categoria: "Joyas", precio: 95000, stock: 25, material: "Plata 925", color: "Plateado" },
  { nombre: "Collar de perlas", categoria: "Joyas", precio: 120000, stock: 15, material: "Perlas naturales", color: "Blanco" },
  { nombre: "Pulsera de cuero", categoria: "Accesorios", precio: 65000, stock: 30, material: "Cuero", color: "Marrón" },
  { nombre: "Aretes de oro", categoria: "Joyas", precio: 210000, stock: 10, material: "Oro 18k", color: "Dorado" }
])
```

### 2. Mostrar todos los productos
```javascript
db.productos.find()
```

### 3. Productos con precio mayor a 100000
```javascript
db.productos.find({ "precio": { "$gt": 100000 } })
```

### 4. Productos por categoría "Joyas"
```javascript
db.productos.find({ "categoria": "Joyas" })
```

### 5. Actualizar el precio de un producto
```javascript
db.productos.updateOne(
  { nombre: "Anillo de plata" },
  { $set: { "precio": 100000 } }
)
```

### 6. Eliminar un producto
```javascript
db.productos.deleteOne({ nombre: "Pulsera de cuero" })
```

### 7. Productos con precio mayor a 100000 (repetido en filtros)
```javascript
db.productos.find({ "precio": { "$gt": 100000 } })
```

### 8. Productos con stock entre 10 y 30
```javascript
db.productos.find({ "stock": { "$gte": 10, "$lte": 30 } })
```

### 9. Productos que NO sean de la categoría “Joyas”
```javascript
db.productos.find({ "categoria": { "$ne": "Joyas" } })
```

### 10. Productos con color “Dorado” o “Plateado”
```javascript
db.productos.find({ "color": { "$in": ["Dorado", "Plateado"] } })
```

---

## Consultas de agregación (estadísticas)

### 11. Contar el total de productos
```javascript
db.productos.aggregate([
  { $count: "total_productos" }
])
```

### 12. Calcular el promedio de precios
```javascript
db.productos.aggregate([
  {
    $group: {
      _id: null,
      promedio_precio: { $avg: "$precio" }
    }
  }
])
```

### 13. Contar productos por categoría
```javascript
db.productos.aggregate([
  {
    $group: {
      _id: "$categoria",
      total_productos: { $sum: 1 }
    }
  }
])
```

### 14. Calcular el valor total del inventario
```javascript
db.productos.aggregate([
  {
    $group: {
      _id: null,
      valor_total: { $sum: { $multiply: ["$precio", "$stock"] } }
    }
  }
])
```

