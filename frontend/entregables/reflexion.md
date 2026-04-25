# ⏱ Feedback 30 segundos — Bloque A
• ¿Tiene sentido tener un único archivo de tipos? ¿Qué ventaja concreta ves frente a declarar los tipos en cada componente?
• Anota en reflexion.md sección A.
(Paolo)Si, es tener mejor un solo archivo donde se concentre todo acerca de las interfaces y types, la ventaja es tener todo mas ordenado +
(Joel) Si, es lo mas optimo porque el codigo esta mas organizado y si se requiere hacer un cambio en una interfaz, no habria necesidad de hacerlo en varios archivos, solo seria en el archivo de tipos.

# ⏱ Feedback 30 segundos — Bloque B
• ¿Qué pasa con el autocompletado en el IDE ahora que los tipos están en un solo lugar?
• Anota en reflexion.md sección B.
(Paolo) Ahora que esta todo en un solo lugar, el ide puede dar mejores sugerencias al escribir codigo, ahora puede rellenar datos de forma mas facil que antes no podia, le dificultaba
(Joel) Ahora el autocompletado es mas rapido y eficiente, ademas de que el IDE puede detectar errores en tiempo de ejecucion, lo que facilita el debugging.

# ⏱ Feedback 30 segundos — Bloque C
• ¿Qué error de runtime podría haberse producido sin el guard if (!context) throw? Piensa en un escenario concreto.
• Anota en reflexion.md sección C.
(Paolo)Si agregamos un componente nuevo que llame al context y este no lo encierra en app.tsx, la app colapsaria al intentar leer propiedades de un contexto inexistente, daria undefined y cargaria la pagina en blanco
(Joel) Si no hubiesemos puesto el guard if (!context) throw, la aplicacion mostraria errores de tipado al intentar usar el contexto sin haber sido inicializado, lo que provocaria que la pagina no cargue correctamente.

# ⏱  Bloque D
✓  El par hizo al menos 3 preguntas a Claude y discutió las respuestas
✓  reflexion.md sección D tiene anotado al menos un concepto nuevo que aprendieron
--- 
(Paolo) La pregunta numero 1 nos ayuda acomprender como funciona nuestros union types, el type que implementamos es como una lista blanca de lo que puede llegar.
(Paolo) En la pregunta 4 aprendi como añadir un tipo adicional pero sin tocar la interface principal, usando el simbolo &, es como añadirle propiedades a una interface ya creada.
(Paolo) En la pregunta 5 me enseño como actuar en caso de que el backend cambie, en el caso que se agregue foto?, ahora debo editar index.ts y agregar un foto? con tipo string.

(Joel)
1. Qué beneficio inmediato notaste al tipar las Props de un componente en lugar de usar JavaScript puro?
Rpta: El beneficio más evidente es el autocompletado y la validación en tiempo de ejecución de desarrollo. Al definir una interface para las Props, VS Code me avisa inmediatamente si olvidé pasar un atributo obligatorio o si el tipo de dato es incorrecto (por ejemplo, pasar un string donde se esperaba un number), evitando errores que en JS vanilla solo vería al romper la aplicación en el navegador. 
2. Qué sucedió con el tipado de eventos (ej. onChange o onClick) en esta sección?
Rpta: Aprendí que React proporciona tipos específicos como React.ChangeEvent<HTMLInputElement> o React.MouseEvent. Usar estos tipos es crucial porque nos permite acceder a propiedades específicas del evento (como event.target.value) con total seguridad de que TypeScript reconoce que existen en ese contexto.
3. Qué sucedió al intentar asignar un valor que no estaba en el union type?
Rpta: TypeScript generó un error indicando que el tipo string no es asignable al tipo EstadoMesa. Esto es muy útil porque garantiza que la lógica visual del componente (colores de las cards) solo responda a estados reales definidos en el contrato de datos del sistema.


# ⏱   Bloque E - EVALUACION ENTRE PARES 🔄 Instrucciones para la evaluación
Ronda 1 (12 min): Persona A explica. Persona B hace las preguntas de abajo.
Ronda 2 (12 min): Invierten. Persona B explica. Persona A hace las preguntas.

1. ¿Qué archivo creamos hoy que no existía antes? ¿Para qué sirve?
(Paolo)El dia de hoy creamos el archivo types/index.ts, sirve para centralizar todos los tipos y interfaces que se usan en la aplicacion, ahora para usar los tipos en diferentes archivos solo hace exportar la interfaz o type que este necesita
(Joel) Archivo creado: types/index.ts
Lo que hace este archivo es almacenar las interfaces y los unión types para recurrir a ellos cada que sean necesarios desde cualquier archivo tsx.

2. Abre el archivo types/index.ts. Sin leerlo, ¿puedes listar de memoria
   cuántos types y cuántas interfaces hay? ¿Cuál es la diferencia entre ellos?
(Paolo)Tenemos alredeodr de 6 interfaces y 3 types.  
(Joel) Hay 3 types y 5 interfaces. La diferencia es que las interfaces son para objetos con atributos y los types son para union types.

3. ¿Por qué PedidoContext usa createContext<PedidoContextType | undefined>
   en lugar de createContext<PedidoContextType>? Explícalo sin código.
(Paolo)Con undefined nos aseguramos de que typescript piense que habra datos en el contexto en el futuro, en caso de que no usemos undefined, tendriamos que pasarle al contexto un objeto que cumpla con la interface en ese instante
(Joel) El Context de React es una herramienta que nos ayuda a compartir datos entre componentes sin necesidad de pasar props de forma manual. Para que un Context sea utilizable en algun componente, este debe tener un "valor inicial". En nuestro caso, al momento de inicializar el Context, no teniamos informacion que mostrar, por lo que optamos por colocar undefined como valor inicial.

4. Si mañana el backend agrega un campo activo: boolean a Mesa,
   ¿en cuántos archivos tienes que hacer el cambio? ¿Cómo TypeScript
   te va a avisar dónde falta el campo?
(Paolo) Si se agrega un campo activo, se edita index.ts se agrega la mesa con tipo boolean y en caso sea necesario se agregan los imports en cada archivo que la use. ts me avisara en caso de estar agregar o usar la mesa y no haya pasado ese campo nuevo
(Joel) En caso de que el Backend tenga aquel campo activo lo que se haría seria editar los siguientes archivo: index.ts (editar interface), MesaCard.tsx (llamar al nuevo campo) y DetallesMesa.tsx (Mostrar el nuevo campo). Si falta un campo en alguno de esos archivos, TypeScript nos avisara de ello al momento de ejecutar el codigo.

5. ¿Qué hace el hook usePedido()? ¿Por qué es mejor que llamar
   useContext(PedidoContext) directamente en cada componente?
(Paolo) Gracias al hook usepedido nos aseguramos que al momento de usar el contexto haya un seguro de intermediario, en caso de no encontrarlo, nos avisara con un error. Si llamaramos el usecontext tendriamos que hacer un if de verificacion siempre, eso nos haria escribir mas codigo
(Joel) El Hook usePedido() se encarga de contener las funciones a las que recurrira el programa (agregar, quitar, limpiar, etc) de modo que mas de un archivo recurra a las funciones requeridas desde ahí. El fin de esto es que a lahora de hacer correcciones solo se tenga que corregir las funciones de un solo archivo en lugar de tener que corregir la misma función en cada archivo.


# CRITERIO 
✓  Ambas personas respondieron todas las preguntas (puede ser con ayuda del código)
✓  Las respuestas a las preguntas 3 y 5 fueron sin leer directamente el código
✓  reflexion.md sección E tiene anotado qué concepto fue el más difícil de explicar

# ⏱  Feedback 30 segundos — Bloque F — Cierre del día
• ¿Qué concepto de TypeScript te costó más entender hoy?
• ¿Qué ventaja concreta viste de centralizar los tipos en types/index.ts?
• Total de errores TypeScript al cierre del Día 2: ___ (los eliminaremos mañana)
(Paolo) me costo mas el concepto de union types, entender como funciona
(Paolo) la ventaja es tener todo mas ordenado y no repetir tipos en diferentes archivos




## Total de errores: 37