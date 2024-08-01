/**
 * Activa el modo de edición en la fila seleccionada.
 * Reemplaza el texto de categoría y monto por campos de entrada editables.
 * Cambia el texto del botón a 'Guardar' y ajusta el evento onClick.
 * @param {HTMLButtonElement} button - El botón de edición en la fila.
 */
function editarFila(button) {
    let row = button.parentNode.parentNode; // Obtiene la fila (tr) del botón clicado
    let categoriaCell = row.querySelector('.categoria'); // Obtiene la celda de categoría
    let montoCell = row.querySelector('.monto'); // Obtiene la celda de monto

    // Guarda los valores actuales de categoría y monto
    let categoria = categoriaCell.innerText;
    let monto = montoCell.innerText;

    // Reemplaza el contenido de las celdas con campos de entrada
    categoriaCell.innerHTML = `<input type="text" value="${categoria}">`;
    montoCell.innerHTML = `<input type="text" value="${monto}">`;

    // Cambia el texto del botón a 'Guardar' y ajusta la función onClick
    button.innerText = 'Guardar';
    button.onclick = function() {
        guardarFila(this);
    };
}

/**
 * Guarda los cambios realizados en la fila seleccionada.
 * Reemplaza los campos de entrada por el texto editado y restaura el botón a su estado original.
 * @param {HTMLButtonElement} button - El botón de guardar en la fila.
 */
function guardarFila(button) {
    let row = button.parentNode.parentNode; // Obtiene la fila (tr) del botón clicado
    let categoriaCell = row.querySelector('.categoria input'); // Obtiene el campo de entrada de categoría
    let montoCell = row.querySelector('.monto input'); // Obtiene el campo de entrada de monto

    // Obtiene los nuevos valores de categoría y monto
    let categoria = categoriaCell.value;
    let monto = montoCell.value;

    // Reemplaza los campos de entrada con los nuevos valores
    row.querySelector('.categoria').innerText = categoria;
    row.querySelector('.monto').innerText = monto;

    // Cambia el texto del botón a 'Editar' y ajusta la función onClick
    button.innerText = 'Editar';
    button.onclick = function() {
        editarFila(this);
    };
}

/**
 * Agrega una nueva fila a la tabla con campos de entrada para categoría y monto.
 * El nuevo botón de la fila está configurado para activar el modo de edición.
 */
function agregarCategoria() {
    let tableBody = document.querySelector('.tabla tbody');
    let newRow = document.createElement('tr');

    // Obtener el mayor ID actual de la tabla
    let maxId = 0;
    const hiddenIds = tableBody.querySelectorAll('.id input[type="hidden"]');
    hiddenIds.forEach(input => {
        const id = parseInt(input.value, 10);
        if (id > maxId) {
            maxId = id;
        }
    });

    // Incrementar el ID
    let newId = maxId + 1;

    newRow.innerHTML = `
        <td class="categoria"><input type="text" placeholder="Categoría"></td>
        <td class="monto"><input type="text" placeholder="Monto"></td>
        <td class="id"><input type="hidden"  value="${newId}"></td>
        <td><button class="edit-button" onclick="editarFila(this)">Editar</button></td>
    `;

    tableBody.appendChild(newRow);
}


// Agrega un evento al botón 'Agregar Categoría' que llama a la función 'agregarCategoria'
document.getElementById('agregar-categoria').addEventListener('click', agregarCategoria);
