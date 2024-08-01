import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import db from "./connectBD.js"
import appLogin from "./loginBD.js"
import appRegister from "./registerBD.js"
import appCategoria from "./categoriaBD.js"
import appRegistrarGasto from "./registroGastosBD.js"
import cors from 'cors';

import mysql from "mysql";
import { config } from 'dotenv';

const app = express();
app.use(cors())
config();

const PORT = process.env.PORT || 3000;

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'Vista' sirve el index.html en el inicio del servidor
app.use(express.static(path.join(__dirname,"..", 'Vista'))); //busca el index, porque maneja la solicitud que hacen al servidor y ubica el index y lo pone


// Configurar rutas


app.use("/api/login", appLogin);
app.use("/api/register", appRegister);
app.use("/api/categoria", appCategoria);


// Ruta para manejar el registro de gastos
app.use("/api/registrar-gasto",appRegistrarGasto);




app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'Vista', 'index.html'));
});
//const PORT = 3000; // Cambiado a un puerto comúnmente utilizado para servidores web
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});


/*{
    "src": "/api/login",
    "dest": "/Back/server.js"
  },
  {
    "src": "/api/register",
    "dest": "/Back/server.js"
  },
  {
    "src": "/api/categoria",
    "dest": "/Back/server.js"
  },*/