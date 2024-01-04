function dividirCadena(cadena) {
  let edificio = cadena.substring(3, 5);
  let apartamento = cadena.substring(5, 9);
  let fechaVencimiento = cadena.substring(16, 24);
  let monto = parseFloat(cadena.substring(28, 33)); // Convertir a número
  let fechaEnvio = cadena.substring(42, 48);

  return {
    edificio: edificio,
    apartamento: apartamento,
    fechaVencimiento: fechaVencimiento,
    monto: monto,
    fechaEnvio: fechaEnvio
  };
}

function procesarArchivos(files) {
  let resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = ''; // Limpiar resultados anteriores

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();

    reader.onload = function (e) {
      let content = e.target.result;
      let codes = content.split('\n');

      let edificioData = {}; // Almacenar datos por edificio

      codes.forEach(code => {
        let resultado = dividirCadena(code);

        // Verificar si el edificio ya está en el objeto
        if (!edificioData.hasOwnProperty(resultado.edificio)) {
          edificioData[resultado.edificio] = {
            resultados: [],
            sumaMontos: 0,
            cantidadPagos: 0,
            fechas: new Set()
          };
        }

        // Almacenar el resultado en el objeto por edificio
        edificioData[resultado.edificio].resultados.push(resultado);
        edificioData[resultado.edificio].sumaMontos += resultado.monto;

        // Registrar la fecha para conteo de pagos
        edificioData[resultado.edificio].fechas.add(resultado.fechaEnvio);
      });

      // Calcular la cantidad de pagos para cada edificio
      for (let edificio in edificioData) {
        if (edificioData.hasOwnProperty(edificio)) {
          edificioData[edificio].cantidadPagos = edificioData[edificio].resultados.length;
        }
      }

      // Mostrar los resultados
      mostrarResultados(edificioData);

      // Agregar botón para exportar a Excel
      let exportButton = document.createElement('button');
      exportButton.innerText = 'Exportar a Excel';
      exportButton.classList.add('btn', 'btn-primary', 'btn-md');
      exportButton.addEventListener('click', function () {
        exportarExcel(edificioData);
      });
      resultContainer.appendChild(exportButton);

      // Agregar botón para exportar a PDF
      /* let exportPdfButton = document.createElement('button');
      exportPdfButton.innerText = 'Exportar a PDF';
      exportPdfButton.addEventListener('click', function () {
        exportarPDF(resultContainer);
      }); */
      resultContainer.appendChild(exportPdfButton);
    };

    reader.readAsText(file);
  }
}

function exportarExcel(edificioData) {
  let wb = XLSX.utils.book_new();
  let allResults = [];

  for (let edificio in edificioData) {
    if (edificioData.hasOwnProperty(edificio)) {
      allResults = allResults.concat(edificioData[edificio].resultados);
    }
  }

  let ws = XLSX.utils.json_to_sheet(allResults);
  XLSX.utils.book_append_sheet(wb, ws, 'Resultados');

  // Guardar el archivo
  XLSX.writeFile(wb, 'listado del dia.xlsx');
}




function mostrarResultados(edificioData) {
  let resultContainer = document.getElementById('resultContainer');

  for (let edificio in edificioData) {
    if (edificioData.hasOwnProperty(edificio)) {
      let edificioDiv = document.createElement('div');
      edificioDiv.innerHTML = `<hr> <h2>Edificio ${edificio}</h2>`;

      edificioData[edificio].resultados.forEach(resultado => {
        let resultString = `
          <p>Número de edificio: ${resultado.edificio}</p>
          <p>Apartamento: ${resultado.apartamento}</p>
          <p>Fecha vencimiento: ${resultado.fechaVencimiento}</p>
          <p>Monto: ${resultado.monto}</p>
          <p>Fecha del envío de Abitab: ${resultado.fechaEnvio}</p>
          <hr>
        `;
        edificioDiv.innerHTML += resultString;
      });

      // Mostrar la cantidad de pagos y la suma total de montos para este edificio
      let infoString = `
        <p style="background-color: #c2e0ed;">Cantidad de pagos: ${edificioData[edificio].cantidadPagos}</p>
        <p style="background-color: #FFD700;">Suma total de montos: ${edificioData[edificio].sumaMontos.toFixed(2)}</p>
      `;
      edificioDiv.innerHTML += infoString;

      resultContainer.appendChild(edificioDiv);
    }
  }
}

document.getElementById('processButton').addEventListener('click', function () {
  let fileInput = document.getElementById('fileInput');
  let files = fileInput.files;

  if (files.length > 0) {
    procesarArchivos(files);
  } else {
    alert('Por favor, seleccione al menos un archivo.');
  }
});
