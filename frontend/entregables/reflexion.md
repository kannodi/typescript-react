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
# ⏱   Bloque E - EVALUACION ENTRE PARES 🔄 Instrucciones para la evaluación
Ronda 1 (12 min): Persona A explica. Persona B hace las preguntas de abajo.
Ronda 2 (12 min): Invierten. Persona B explica. Persona A hace las preguntas.

1. ¿Qué archivo creamos hoy que no existía antes? ¿Para qué sirve?
(Paolo)El dia de hoy creamos el archivo types/index.ts, sirve para centralizar todos los tipos y interfaces que se usan en la aplicacion, ahora para usar los tipos en diferentes archivos solo hace exportar la interfaz o type que este necesita
2. Abre el archivo types/index.ts. Sin leerlo, ¿puedes listar de memoria
   cuántos types y cuántas interfaces hay? ¿Cuál es la diferencia entre ellos?
(Paolo)Tenemos alredeodr de 6 interfaces y 3 types.  
3. ¿Por qué PedidoContext usa createContext<PedidoContextType | undefined>
   en lugar de createContext<PedidoContextType>? Explícalo sin código.
(Paolo)Con undefined nos aseguramos de que typescript piense que habra datos en el contexto en el futuro, en caso de que no usemos undefined, tendriamos que pasarle al contexto un objeto que cumpla con la interface en ese instante
4. Si mañana el backend agrega un campo activo: boolean a Mesa,
   ¿en cuántos archivos tienes que hacer el cambio? ¿Cómo TypeScript
   te va a avisar dónde falta el campo?
Si se agrega un campo activo, se edita index.ts se agrega la mesa con tipo boolean y en caso sea necesario se agregan los imports en cada archivo que la use. ts me avisara en caso de estar agregar o usar la mesa y no haya pasado ese campo nuevo
5. ¿Qué hace el hook usePedido()? ¿Por qué es mejor que llamar
   useContext(PedidoContext) directamente en cada componente?
Gracias al hook usepedido nos aseguramos que al momento de usar el contexto haya un seguro de intermediario, en caso de no encontrarlo, nos avisara con un error. Si llamaramos el usecontext tendriamos que hacer un if de verificacion siempre, eso nos haria escribir mas codigo
# CRITERIO 
✓  Ambas personas respondieron todas las preguntas (puede ser con ayuda del código)
✓  Las respuestas a las preguntas 3 y 5 fueron sin leer directamente el código
✓  reflexion.md sección E tiene anotado qué concepto fue el más difícil de explicar

# ⏱  Feedback 30 segundos — Bloque F — Cierre del día
• ¿Qué concepto de TypeScript te costó más entender hoy?
• ¿Qué ventaja concreta viste de centralizar los tipos en types/index.ts?
• Total de errores TypeScript al cierre del Día 2: ___ (los eliminaremos mañana)
