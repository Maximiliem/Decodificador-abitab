document.getElementById('processButton').addEventListener('click', function () {
  let fileInput = document.getElementById('fileInput');
  let files = fileInput.files;

  if (files.length > 0) {
    procesarArchivos(files);
  } else {
    alert('Por favor, seleccione al menos un archivo.');
  }
});

function procesarArchivos(files) {
  let resultadoDiv = document.getElementById('resultadoContainer');
  let totalesDiv = document.getElementById('totalesContainer');

  resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
  totalesDiv.innerHTML = ''; // Limpiar resultados anteriores

  let edificioTotales = {};

  function leerArchivo(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = function (e) {
        resolve(e.target.result);
      };

      reader.readAsText(file);
    });
  }

  async function procesarArchivosAsync() {
    for (let i = 0; i < files.length; i++) {
      let content = await leerArchivo(files[i]);
      let codes = content.split('\n');

      codes.forEach(numeroSerie => {
        if (numeroSerie.trim() !== '') {
          procesarNumeroSerie(numeroSerie, edificioTotales);
        }
      });

      // Mostrar total recaudado por edificio en pantalla después de procesar cada archivo
      mostrarTotalesEdificio(edificioTotales);
    }
  }

  procesarArchivosAsync();
}

function procesarNumeroSerie(numeroSerie, edificioTotales) {
  let edificio = numeroSerie.substring(4, 8); // Corregido para obtener el edificio correctamente 
  let monto = parseFloat(numeroSerie.substring(14, 20)); // Corregido para obtener el monto correctamente

  // Realizar el seguimiento de la suma total por edificio
  sumarMontoPorEdificio(edificio, monto, edificioTotales);
}

function sumarMontoPorEdificio(edificio, monto, edificioTotales) {
  if (!edificioTotales.hasOwnProperty(edificio)) {
    edificioTotales[edificio] = 0;
  }

  edificioTotales[edificio] += monto;
}

function mostrarTotalesEdificio(edificioTotales) {
  let totalesDiv = document.getElementById('totalesContainer');
  totalesDiv.innerHTML = ''; // Limpiar resultados anteriores

  for (let edificio in edificioTotales) {
    if (edificioTotales.hasOwnProperty(edificio)) {
      let totalParrafo = document.createElement('p');
      totalParrafo.textContent = `Edificio ${edificio}: Total Recaudado ${edificioTotales[edificio].toFixed(2)}`;
      totalesDiv.appendChild(totalParrafo);
    }
  }
}
