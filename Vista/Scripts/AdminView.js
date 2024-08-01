document.addEventListener('DOMContentLoaded', function() {
    // Simulación de datos
    const transacciones = [
        { id: 1, fecha: '2024-07-22', usuario: 'Juan Pérez', monto: '$200', categoria: 'COMIDA' },
        { id: 2, fecha: '2024-07-23', usuario: 'Ana Gómez', monto: '$150', categoria: 'TRANSPORTE' },
        { id: 3, fecha: '2024-07-24', usuario: 'Luis Martínez', monto: '$100', categoria: 'ENTRETENIMIENTO' },
    ];

    const usuarios = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', ultimaActividad: '2024-07-23 15:00' },
        { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', ultimaActividad: '2024-07-23 14:00' },
    ];

    // Referencias a los elementos del DOM
    const transaccionesBody = document.getElementById('transaccionesBody');
    const usuariosBody = document.getElementById('usuariosBody');
    const totalTransacciones = document.getElementById('totalTransacciones');
    const totalUsuariosActivos = document.getElementById('totalUsuariosActivos');
    const totalGastos = document.getElementById('totalGastos');

    // Función para cargar las transacciones
    function cargarTransacciones() {
        transacciones.forEach(t => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${t.id}</td>
                <td>${t.fecha}</td>
                <td>${t.usuario}</td>
                <td>${t.monto}</td>
                <td>${t.categoria}</td>
            `;
            transaccionesBody.appendChild(tr);
        });
        totalTransacciones.textContent = transacciones.length;
        totalGastos.textContent = transacciones.reduce((sum, t) => sum + parseFloat(t.monto.replace('$', '')), 0).toFixed(2);
    }

    // Función para cargar los usuarios activos
    function cargarUsuarios() {
        usuarios.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.ultimaActividad}</td>
            `;
            usuariosBody.appendChild(tr);
        });
        totalUsuariosActivos.textContent = usuarios.length;
    }

    // Llamar a las funciones para cargar los datos
    cargarTransacciones();
    cargarUsuarios();
});
