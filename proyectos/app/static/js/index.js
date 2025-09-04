document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('kilometers');
    const valueDisplay = document.getElementById('km-value');

    valueDisplay.textContent = rangeInput.value;

    rangeInput.addEventListener('input', () => {
        valueDisplay.textContent = rangeInput.value;
    });
})

// Función para guardar y mostrar datos
function guardarDatos(event) {
    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const kilometros = document.getElementById('kilometers').value;
    const litros = document.getElementById('litros').value;
    const precio = document.getElementById('precio').value;

    const nuevoRegistro = { fecha, kilometros, litros, precio };

    // Obtener registros anteriores
    const registros = JSON.parse(localStorage.getItem('repostajes')) || [];

    // Agregar nuevo registro
    registros.push(nuevoRegistro);
    localStorage.setItem('repostajes', JSON.stringify(registros));

    mostrarTabla(registros);
}

// Mostrar tabla con registros
function mostrarTabla(registros) {
    const tabla = document.getElementById('tabla-registros');
    tabla.innerHTML = `
        <tr>
          <th>Fecha</th>
          <th>Kilómetros</th>
          <th>Litros</th>
          <th>Precio (€)</th>
        </tr>
      `;

    registros.forEach(reg => {
        tabla.innerHTML += `
          <tr>
            <td>${reg.fecha}</td>
            <td>${reg.kilometros}</td>
            <td>${reg.litros}</td>
            <td>${reg.precio}</td>
          </tr>
        `;
    });
}

// Descargar JSON
function descargarJSON() {
    const registros = localStorage.getItem('repostajes');
    const blob = new Blob([registros], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'repostajes.json';
    enlace.click();

    URL.revokeObjectURL(url);
}

// Mostrar tabla al cargar
window.onload = () => {
    const registros = JSON.parse(localStorage.getItem('repostajes')) || [];
    mostrarTabla(registros);
}