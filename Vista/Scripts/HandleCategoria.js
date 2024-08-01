// Obtener datos del backend y actualizar la interfaz de usuario
let categoriasExistentesId = []
function GuardarArchivos (){
    console.log("se cargo este")
    const usuarioId = localStorage.getItem('userId');

    if (usuarioId) {

        fetch(`/api/categoria?usuarioId=${usuarioId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let tableBody = document.querySelector('.tabla tbody');
                    tableBody.innerHTML = ''; // Limpiar tabla existente

                    data.data.forEach(categoria => {
                        let row = document.createElement('tr');
                        row.setAttribute('data-id', categoria.id); // Almacena el ID en un atributo de datos

                        row.innerHTML = `
                            <td class="categoria"><input type="text"  value="${categoria.nombre}"></td>
                            <td class="monto"><input type="number"  value="${categoria.presupuesto}"></td>
                            <td class="id"><input type="hidden"  value="${categoria.id}"></td>
                            <td><button class="edit-button" onclick="editarFila(this)">Editar</button></td>
                        `;
                        categoriasExistentesId.push(categoria.id)
                        console.log(categoria.id)
                        tableBody.appendChild(row);
                    });
                }
            });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    GuardarArchivos();
});


document.getElementById("guardar").addEventListener("click",()=> {
    GuardarArchivos();
    // Función para obtener el contenido de las celdas y enviarlo al servidor
    const usuarioId = localStorage.getItem('userId');
    let categoriasActualizar = [];
    let categoriasNuevas = [];
    console.log(usuarioId)
    if (usuarioId) {
                    let tableBody = document.querySelector('.tabla tbody');
                    let filas = tableBody.querySelectorAll('tr');

                    let count = 0
                    filas.forEach(fila => {
                        const categoria = fila.querySelector('.categoria input').value;
                        const monto = fila.querySelector('.monto input').value;
                        const id = fila.querySelector('.id input').value;


                        if (categoria && monto) {// Asegúrate de que ambos campos no estén vacíos
                            if(categoriasExistentesId[count] == id) {
                                categoriasActualizar.push({id, categoria, monto, usuarioId});
                                console.log(id, categoria, monto, usuarioId, "actualiza")
                            }else{
                                categoriasNuevas.push({id, categoria, monto, usuarioId});
                                console.log("nuevas",id, categoria, monto, usuarioId)
                            }
                        }
                        count ++;
                    });

                    categoriasActualizar.map(categoria=>{
                        console.log(categoria)
                    })

        if(categoriasActualizar.length>0){
            fetch(`/api/categoria?usuarioId=${usuarioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({categoriasActualizar})
            }).then(response => response.json())
                .then(data=>{
                    if(data.success) {
                        alert("categorias actualizadas guardadas correctamente")
                        location.reload()
                    }else{
                        alert("error, ingrese todos los campos")
                    }
                })

        }

        if(categoriasNuevas.length>0){
            fetch(`/api/categoria`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({categoriasNuevas})
            }).then(response => response.json())
                .then(data=>{
                    if (data.success){
                        alert("categorias nuevas agregadas correctamente")
                        location.reload()
                    }else{
                        console.log(data.success)
                        alert("error, ingrese todos los campos post")
                    }
                }).catch(error => console.error('Error:', error));
        }
                    // console.log(data.data[0].nombre)
    }
})



        /*let tableBody = document.querySelector('.tabla tbody');
        let filas = tableBody.querySelectorAll('tr');
        let categorias = [];


        filas.forEach(fila => {
            const categoria = fila.querySelector('.categoria input').value;
            const monto = fila.querySelector('.monto input').value;

            if (categoria && monto) {  // Asegúrate de que ambos campos no estén vacíos
                categorias.push({ categoria, monto });
            }
        });


        // Enviar datos al servidor
        fetch('/categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categorias)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Categorías guardadas exitosamente');
                } else {
                    alert('Hubo un error al guardar las categorías');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
})*/