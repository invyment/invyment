// backend/db.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",      // Cambiar si su MySQL está en otro equipo
  user: "root",           // Su usuario MySQL
  password: "leoDANIEL2025",           // Su contraseña MySQL
  database: "invyment_db" // Nombre de su base de datos
});
