function dividirCadena(cadena) {
  if (!cadena || cadena.length < 48) {
    return null; // Manejar casos donde la cadena no cumple con la longitud mínima
  }

  let edificio = cadena.substring(3, 5);
  let apartamento = cadena.substring(5, 9);
  let fechaVencimiento = cadena.substring(16, 24);
  let monto = parseFloat(cadena.substring(28, 33)) || 0; // Convertir a número y manejar NaN
  let fechaEnvio = cadena.substring(42, 48);

  return {
    edificio,
    apartamento,
    fechaVencimiento,
    monto,
    fechaEnvio,
  };
}

function procesarArchivos(files) {
  let resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Limpiar resultados anteriores

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();

    reader.onload = function (e) {
      let content = e.target.result;
      let codes = content.split("\n");

      let edificioData = {}; // Almacenar datos por edificio

      codes.forEach((code) => {
        let resultado = dividirCadena(code);
        if (!resultado) return; // Ignorar cadenas inválidas

        if (!edificioData[resultado.edificio]) {
          edificioData[resultado.edificio] = {
            resultados: [],
            sumaMontos: 0,
            cantidadPagos: 0,
            fechas: new Set(),
          };
        }

        // Almacenar el resultado en el objeto por edificio
        edificioData[resultado.edificio].resultados.push(resultado);
        edificioData[resultado.edificio].sumaMontos += resultado.monto;

        // Registrar la fecha para conteo de pagos
        edificioData[resultado.edificio].fechas.add(resultado.fechaEnvio);
      });

      // Calcular la cantidad de pagos para cada edificio
      Object.keys(edificioData).forEach((edificio) => {
        edificioData[edificio].cantidadPagos =
          edificioData[edificio].resultados.length;
      });

      // Mostrar los resultados
      mostrarResultados(edificioData);

      // Agregar botón para exportar a Excel
      let exportButton = document.createElement("button");
      exportButton.innerText = "Exportar a Excel";
      exportButton.classList.add("btn", "btn-primary", "btn-md");
      exportButton.addEventListener("click", function () {
        exportarExcel(edificioData);
      });
      resultContainer.appendChild(exportButton);
    };

    reader.readAsText(file);
  }
  sessionStorage.setItem("edificioData", JSON.stringify(edificioData));
}

function exportarExcel(edificioData) {
  let wb = XLSX.utils.book_new(); // Crear un nuevo libro de Excel

  // Recorremos los edificios y creamos una hoja para cada edificio
  Object.keys(edificioData).forEach((edificio) => {
    let edificioResultados = edificioData[edificio].resultados.map(
      (resultado) => {
        return {
          Edificio: resultado.edificio,
          Apartamento: resultado.apartamento,
          "Fecha Vencimiento": resultado.fechaVencimiento,
          Monto: resultado.monto.toFixed(2),
          "Fecha Envío": resultado.fechaEnvio,
        };
      }
    );

    // Crear una hoja de Excel a partir de los datos de cada edificio
    let ws = XLSX.utils.json_to_sheet(edificioResultados);
    XLSX.utils.book_append_sheet(wb, ws, `Edificio ${edificio}`); // Agregar la hoja al libro
  });

  // Guardar el archivo
  XLSX.writeFile(wb, "listado_del_dia.xlsx");
}

function mostrarResultados(edificioData) {
  let resultContainer = document.getElementById("resultContainer");

  Object.keys(edificioData).forEach((edificio) => {
    let edificioDiv = document.createElement("div");
    edificioDiv.innerHTML = `<hr> <h2>Edificio ${edificio}</h2>`;

    edificioData[edificio].resultados.forEach((resultado) => {
      let resultString = `
        <p>Número de edificio: ${resultado.edificio}</p>
        <p>Apartamento: ${resultado.apartamento}</p>
        <p>Fecha vencimiento: ${resultado.fechaVencimiento}</p>
        <p>Monto: ${resultado.monto.toFixed(2)}</p>
        <p>Fecha del envío de Abitab: ${resultado.fechaEnvio}</p>
        <hr>
      `;
      edificioDiv.innerHTML += resultString;
    });

    // Mostrar la cantidad de pagos y la suma total de montos para este edificio
    let infoString = `
      <p style="background-color: #c2e0ed;">Cantidad de pagos: ${
        edificioData[edificio].cantidadPagos
      }</p>
      <p style="background-color: #FFD700;">Suma total de montos: ${edificioData[
        edificio
      ].sumaMontos.toFixed(2)}</p>
    `;
    edificioDiv.innerHTML += infoString;

    resultContainer.appendChild(edificioDiv);
  });
}

document.getElementById("processButton").addEventListener("click", function () {
  let fileInput = document.getElementById("fileInput");
  let files = fileInput.files;

  if (files.length > 0) {
    procesarArchivos(files);
  } else {
    alert("Por favor, seleccione al menos un archivo.");
  }
});
