import express from "express";
import createDBConnection from "./connectBD.js";

const appRegister = express();
appRegister.use(express.json());  // Asegúrate de que puedes manejar JSON en el cuerpo de la solicitud


    appRegister.post('/', async (req, res) => {
        const { nombre, apellido, email, telefono, usuario, password } = req.body;


        // Verifica que tengas todas las variables definidas correctamente
        if (!nombre || !apellido || !email || !telefono || !usuario || !password) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const query = "INSERT INTO usuarios (nombre, apellido, email, telefono, usuario, password) VALUES (?, ?, ?, ?, ?, ?)";

        let db;
        try {
            db = await createDBConnection();
            const [result] = await db.execute(query, [nombre, apellido, email, telefono, usuario, password]);
            console.log('Usuario registrado correctamente.', result);
            res.json({ success: true, message: 'Usuario registrado correctamente' });
        } catch (err) {
            console.error('Error al insertar usuario:', err);
            res.status(500).json({ success: false, message: 'Error al registrar usuario' });
        } finally {
            if (db) {
                await db.end();
                console.log('Conexión a la base de datos cerrada.');
            }
        }
    });

    export default appRegister;

