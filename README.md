# Decodificador de Códigos de Cobranza de Abitab para Genova SRL

Este proyecto nació en diciembre de 2023 como una solución de emergencia ante la caída del software original utilizado para procesar los pagos de gastos comunes recibidos mediante la red de cobranzas Abitab (Uruguay).

## 🧾 ¿Qué hace esta aplicación?

Todos los días, Abitab envía por correo electrónico un archivo `.txt` con los datos de los pagos realizados por las unidades de los edificios que administra **Genova SRL**. Este decodificador procesa esos archivos para convertir la información en un formato legible y útil para la liquidación manual de gastos comunes.

## 🔍 Datos que procesa

Por cada pago registrado, la aplicación extrae los siguientes datos:

- 🏢 Edificio
- 🚪 Apartamento
- 📅 Fecha de vencimiento
- 💰 Monto pagado
- 📤 Fecha de envío

Además, genera un resumen con:

- Totales por edificio y fecha
- Estado del pago (si se pagó en fecha o fuera de término)

## 📤 Exportación a Excel

La herramienta permite exportar los datos procesados a un archivo Excel, para que el equipo de administración pueda revisar, verificar y liquidar fácilmente los gastos comunes de cada edificio.

## 🤝 Contribuciones

En 2024, el proyecto recibió una valiosa contribución de otro developer que ayudó a mejorarlo y hacerlo más robusto. ¡Gracias totales, [@msalvezgimenez](https://github.com/msalvezgimenez)!

## 🚧 Estado del proyecto

Este decodificador actualmente ya no se encuentra en uso por **Genova SRL**, pero supo cumplir un rol clave en el flujo diario de trabajo frente a una situación de emergencia. Es un proyecto con potencial para integrarse en un futuro software de liquidación de gastos comunes de edificios.

## 🛠 Tecnologías utilizadas

- HTML  
- CSS / SCSS  
- JavaScript

## 📫 Contacto

Si querés aportar, hacer sugerencias o tenés preguntas, podés abrir un issue o un pull request.

También podés escribirme a [maximiliem.dev@gmail.com](mailto:maximiliem.dev@gmail.com)

---

> Desarrollado originalmente por [@Maximiliem](https://github.com/Maximiliem)  
> Contribución destacada por [@msalvezgimenez](https://github.com/msalvezgimenez)
