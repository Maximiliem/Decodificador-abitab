// Variable para almacenar la suma de montos
let sumaMontos = 0;

function dividirCadena(cadena) {
  let edificio = cadena.substring(3, 5);
  let apartamento = cadena.substring(5, 9);
  let fechaVencimiento = cadena.substring(16, 24);
  let monto = cadena.substring(28, 33);
  let fechaEnvio = cadena.substring(42, 48);

  // Convierte el monto a un número y acumula la suma
  sumaMontos += parseFloat(monto);

  return {
    edificio: edificio,
    apartamento: apartamento,
    fechaVencimiento: fechaVencimiento,
    monto: monto,
    fechaEnvio: fechaEnvio
  };
}

function manejarEnvioFormulario(event) {
  event.preventDefault(); // Evita que la página se recargue

  let cadena = event.target.elements.cadena.value; // Obtiene la cadena del formulario
  let resultado = dividirCadena(cadena);

  // Muestra los resultados en la página web
  document.getElementById('edificio').textContent = 'Número de edificio: ' + resultado.edificio;
  document.getElementById('apartamento').textContent = 'Apartamento: ' + resultado.apartamento;
  document.getElementById('fechaVencimiento').textContent = 'Fecha vencimiento: ' + resultado.fechaVencimiento;
  document.getElementById('monto').textContent = 'Monto: ' + resultado.monto;
  document.getElementById('fechaEnvio').textContent = 'Fecha del envío de Abitab: ' + resultado.fechaEnvio;

  // Muestra la suma acumulada de montos
  document.getElementById('sumaMontos').textContent = 'Suma acumulada de montos: ' + sumaMontos.toFixed(2);

  // Vacía el campo de input después de enviar el formulario
  event.target.elements.cadena.value = '';
};

function resetearValores() {
  // Reinicia la suma de montos y borra los resultados en la página
  sumaMontos = 0;
  document.getElementById('edificio').textContent = '';
  document.getElementById('apartamento').textContent = '';
  document.getElementById('fechaVencimiento').textContent = '';
  document.getElementById('monto').textContent = '';
  document.getElementById('fechaEnvio').textContent = '';
  document.getElementById('sumaMontos').textContent = '';
};


document.getElementById('idFormulario').addEventListener('submit', manejarEnvioFormulario);

// Agrega un event listener para el botón de reset
document.getElementById('resetButton').addEventListener('click', resetearValores);
