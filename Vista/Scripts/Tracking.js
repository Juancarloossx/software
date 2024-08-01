document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el contexto del canvas para dibujar el gráfico
    const ctx = document.getElementById('graficoGastos').getContext('2d');

    // Configuración de los datos del gráfico
    const datos = {
        labels: ['COMIDA', 'TRANSPORTE', 'ENTRETENIMIENTO'],
        datasets: [{
            data: [400000, 150000, 100000],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    // Configuración del gráfico de pastel
    const config = {
        type: 'pie',
        data: datos,
    };

    // Crea una nueva instancia del gráfico
    const graficoGastos = new Chart(ctx, config);

    // Maneja el evento de clic en el botón para generar informes
    document.getElementById('generarInforme').addEventListener('click', function() {
        // Captura los valores de las fechas ingresadas
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        // Muestra una alerta con las fechas seleccionadas
        alert(`Generando informe desde ${fechaInicio} hasta ${fechaFin}`);
    });

    // Maneja el evento de clic en el botón para buscar gastos
    document.getElementById('buscarGasto').addEventListener('click', function() {
        // Captura los valores de los campos de búsqueda
        const categoria = document.getElementById('categoria').value;
        const monto = document.getElementById('monto').value;
        const fecha = document.getElementById('fecha').value;
        // Muestra una alerta con los parámetros de búsqueda
        alert(`Buscando gasto en categoría ${categoria} de ${monto} en fecha ${fecha}`);
    });
});
