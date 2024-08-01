const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Cargar el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../personalizarPresupuesto.html'), 'utf8');

let dom;
let document;

beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    const scriptContent = fs.readFileSync(path.resolve(__dirname, 'CrudCustomizeBudget.js'), 'utf8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
});

describe('editarFila', () => {
    test('should replace text with input fields and change button text to "Guardar"', () => {
        const button = document.createElement('button');
        button.innerText = 'Editar';

        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.classList.add('categoria');
        categoriaCell.innerText = 'ALIMENTO';
        const montoCell = document.createElement('td');
        montoCell.classList.add('monto');
        montoCell.innerText = '400,000';

        row.appendChild(categoriaCell);
        row.appendChild(montoCell);
        const buttonCell = document.createElement('td');
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        document.querySelector('.tabla tbody').appendChild(row);

        // Llamar a la función editarFila
        dom.window.editarFila(button);

        expect(categoriaCell.querySelector('input').value).toBe('ALIMENTO');
        expect(montoCell.querySelector('input').value).toBe('400,000');
        expect(button.innerText).toBe('Guardar');
    });
});

describe('guardarFila', () => {
    test('should replace input fields with text and change button text to "Editar"', () => {
        const button = document.createElement('button');
        button.innerText = 'Guardar';

        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.classList.add('categoria');
        categoriaCell.innerHTML = '<input type="text" value="ALIMENTO">';
        const montoCell = document.createElement('td');
        montoCell.classList.add('monto');
        montoCell.innerHTML = '<input type="text" value="400,000">';

        row.appendChild(categoriaCell);
        row.appendChild(montoCell);
        const buttonCell = document.createElement('td');
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        document.querySelector('.tabla tbody').appendChild(row);

        // Llamar a la función guardarFila
        dom.window.guardarFila(button);

        expect(categoriaCell.innerText).toBe('ALIMENTO');
        expect(montoCell.innerText).toBe('400,000');
        expect(button.innerText).toBe('Editar');
    });
});

describe('agregarCategoria', () => {
    test('should add a new row with input fields and an Editar button', () => {
        const tableBody = document.querySelector('.tabla tbody');

        // Llamar a la función agregarCategoria
        dom.window.agregarCategoria();

        const newRow = tableBody.querySelector('tr:last-child');
        expect(newRow).not.toBeNull();

        // Asegurarse de que la nueva fila tiene campos de entrada
        expect(newRow.querySelector('.categoria input')).not.toBeNull();
        expect(newRow.querySelector('.monto input')).not.toBeNull();

        // Verificar el botón en la nueva fila
        const editButton = newRow.querySelector('button');
        expect(editButton).not.toBeNull();
        expect(editButton.innerText).toBe('Editar');
    });
});
