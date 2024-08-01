import express from "express"
const appCategoria = express();
import createDBConnection from "./connectBD.js";
/*ruta que devuelve todas*/
appCategoria.get("/",async (req, res)=>{
    let usuario_id = req.query.usuarioId;
    console.log(usuario_id)
    const query = 'SELECT * FROM categorias WHERE usuario_id = ?';

    let db
    try{
        db = await createDBConnection();
        const [result] = await db.execute(query, [usuario_id])
            if (result.length > 0) {
                res.json({ success: true, data:result });
            }
    }catch (err){
        console.error('Error al cargar un usuario:', err);
        res.status(500).json({ success: false, message: 'Error al cargar usuarios el servidor' });
    }finally {
        if (db) {
            await db.end();
            console.log('Conexión a la base de datos cerrada.');
        }
    }
})

appCategoria.delete("/",async(req,res)=>{
    const id = req.body
    const query = 'DELETE FROM categorias WHERE id = ?;'

    let db
    try{
        db = await createDBConnection();
        await db.execute(query,[id])
        return res.json({success:true,message:"dato eliminado correctamente"})
    }catch(err){
        console.error('Error al eliminar una categoria:', err);
        res.status(500).json({ success: false, message: 'Error al eliminar categorias el servidor' });
    }finally {
        if (db) {
            await db.end();
            console.log('Conexión a la base de datos cerrada.');
        }
    }

})

/*ruta para agregar categorias*/
appCategoria.post("/", async(req,res)=>{
    const {categoriasNuevas} = req.body
    let categoryAdded = [];
    const query = 'INSERT INTO categorias (nombre, presupuesto, usuario_id) VALUES (?, ?, ?);'
let db
try{
    await Promise.all(categoriasNuevas.map((categoria)=>{
        return new Promise(async (resolve,reject)=>{
            db = await createDBConnection();
            const [result]= await db.execute(query,[categoria.categoria,categoria.monto,categoria.usuarioId])
                if(result.affectedRows>0){
                    categoryAdded.push(categoria.id)
                }
                resolve();
        })
    }))
    res.json({ success: true, message: 'Registros actualizados con éxito'})
}catch (err){
    console.error('Error in request handling:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar registros', error: err.message });
}finally {
    if (db) {
        await db.end();
        console.log('Conexión a la base de datos cerrada.');
    }
}

})

/*ruta que actualiza las categorias todas*/
appCategoria.put("/",async (req, res)=>{
    const {categoriasActualizar} = req.body
    const query = 'UPDATE categorias SET nombre = ?, presupuesto = ? WHERE usuario_id = ? AND id = ?;'


    let db
    let promises
    try{
        promises = categoriasActualizar.map(async (categoria)=>{
            db = await createDBConnection();
            const [result]= await  db.execute(query, [categoria.categoria,categoria.monto,categoria.usuarioId,categoria.id])
                if (result.insertId){
                    // res.json({success:true})
                    // console.log('1 registro insertado, ID:', results.insertId);
                    resolve(result);
                }
        })
    }catch (err){
        console.error('Error ejecutando las consultas:', err);
        res.status(500).json({ success: false, message: 'Error ejecutando las consultas' });
    }
/*hay que manejar que guarde los que no existen */

    try {
        // Esperar a que todas las promesas se resuelvan
        const results = await Promise.all(promises);

        // Verificar si alguna actualización se realizó
        const allUpdated = results.length>0

        if (allUpdated) {
            res.json({ success: true, message: 'Registros actualizados con éxito' });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron registros para actualizar' });
        }
    } catch (err) {
        console.error('Error ejecutando las consultas:', err);
        res.status(500).json({ success: false, message: 'Error ejecutando las consultas' });
    }finally {
        if (db) {
            await db.end();
            console.log('Conexión a la base de datos cerrada.');
        }
    }
})

export default appCategoria
