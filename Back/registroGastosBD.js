import express from "express"
const appRegistrarGasto = express();
import db from "./connectBD.js";



appRegistrarGasto.post('/registrar-gasto', (req, res) => {
    const { cantidad, fecha, descripcion, categoria, usuarioId } = req.body;
    console.log('Datos recibidos en /registrar-gasto:', req.body);

    // Verifica si el usuario existe
    const queryUsuario = 'SELECT id FROM usuarios WHERE id = ?';
    db.query(queryUsuario, [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al verificar el usuario' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuario no válido' });
        }

        // Si el usuario existe, inserta el gasto
        const queryGasto = 'INSERT INTO gastos (cantidad, fecha, descripcion, categoria, usuario_id) VALUES (?, ?, ?, ?, ?)';
        db.query(queryGasto, [cantidad, fecha, descripcion, categoria, usuarioId], (err, results) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                return res.status(500).json({ success: false, message: 'Error al registrar el gasto' });
            }
            res.json({ success: true });
        });
    });
});
export default  appRegistrarGasto;