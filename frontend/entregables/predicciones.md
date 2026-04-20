Predicción A
✍ Antes de ejecutar — escribe en tu predicciones.md

¿Qué archivo generará el comando de instalación además de actualizar package.json?

¿Qué opciones del tsconfig.json son específicas para React con JSX?

(Paolo)Escribe tu respuesta aquí: 
1. se actualizara package y package lock, el primero para las versiones y el segundo para las versiones de las dependencias usadas tambien, asi si joel clona el proyecto funcionara exactamente igual que en mi pc.
2. Las mas importante revisando el documento son     "jsx": "react-jsx" y el strict, el primero para que entienda que trabajara con la version +17 de react y la segunda para activar el supervisor de typescript, asi encontramos errores antes de ejecutar el proyecto.

Predicción B
✍ Antes de ejecutar — escribe en tu predicciones.md
¿Cuántos archivos vas a renombrar en total? Lista sus nombres.
¿En qué tipo de líneas crees que aparecerá el primer error TS?

(Paolo)Escribe tu respuesta aquí: 
1. En total serian 11 NavBar, PlatoCard, MesaCard, MenuPage, MesasPage, CarritoPage, DetalleMesa, NotFound, PedidoContext, App, main
2. En todas las lineas donde llamamos parametros sin especificar el tipo de valor, mas de 20 creo