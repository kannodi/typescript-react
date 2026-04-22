# ⏱ Feedback 30 segundos — Bloque A
Navigator pregunta al Driver:
• ¿Qué parte de la instalación fue confusa?
• ¿Qué opción del tsconfig no tienes claro para qué sirve?
Anota la respuesta en tu reflexion.md (sección Bloque A).

(Paolo)
1. la instalacion fue algo confusa ya que habia que configurar el tsconfig.json para que funcionara correctamente con react, entre tanto codigo que tenia no sabia que modificar al inicio
2. La mayoria no la tengo claro pero hay 3 importantes que me acuerdo bien, el primero es el strict, este para supervisar bien, el segundo es el jsx, que lo deja poder entender react y el tercero me lo recordo el agente, el noEmit, le dice a ts que solo busque errores y deje que VITE construya la app


# ⏱ Feedback 30 segundos — Bloque B
Anota en reflexion.md sección B:
• ¿Cuántos errores aparecieron? ¿Más o menos de lo que predijiste?
• ¿Qué error fue el más inesperado?

(Paolo)
1. aparecieron 105 errores, mucho mas de lo que pense.
2. la verdad todos los errores me resultaron inesperados, aunque analizando un poco era totalmente logico ya que en todo lugar donde se espera un valor hace falta interface

(Joel)
1. La cantidad de errores que aparecieron fueron mas de 90.
2. Son demasiados, por lo que no sabria decir cual fue el mas inesperado.

# ⏱ Feedback 30 segundos — Bloque C
Anota en reflexion.md sección C:
• ¿El tipado de 'onAgregar' fue lo que esperabas?  ¿Qué significa '(plato: Plato) => void'?

(Paolo) No fue lo que esperaba, ya que habia una llamada en contexto dentro de platocard, tuvimos que averiguar como solucionar lo del contexto y agregamos las interfaces, cosa que parece que se avanza en el dia 2, pero si se logro entender como se tipean la interface para el componente

(Joel) No fue lo que esperaba, ya que el componente PlatoCard tiene una llamada en contexto dentro de la funcion de agregarPlato, por lo que fué necesario solucionar lo del contexto y agregamos las interfaces.
Y en cuanto al significado de '(plato: Plato) => void', significa que la funcion recibe un parametro de tipo Plato y no retorna ningun valor.

# ⏱ Feedback 30 segundos — Bloque D
• ¿El union type te parece mejor que usar string? ¿Por qué sí o por qué no?
Anota en reflexion.md sección D.

(Paolo) Si es mucho mejor ya que definimos exactamente el tipo de string que esperamos, de esta forma nos evitamos errores de que ingresen valores que no son validos

(Joel) Si, porque definimos que valores corresponden a esa propiedad. De esta evitamos errores producidos por ingresar valores no correspondientes.

# ⏱ Feedback 30 segundos — Bloque E
• ¿Tiene sentido tipar el retorno de las funciones API? ¿Qué beneficio concreto ves?
Anota en reflexion.md sección E.

(Paolo) Tiene todo el sentido, es necesario ya que de esta forma nos momento de usar una api o funciones les daremos el tipo exacto de retorno y asi nos ahorramos muchos errores

(Joel) Sí, tiene mucho sentido. Te permite tener autocompletado en el editor y detectar errores de escritura antes de ejecutar el código. Así te aseguras de saber exactamente qué propiedades trae la respuesta del backend sin tener que adivinar.

# ⏱ Feedback final del día — 2 minutos
Escribir en reflexion.md sección 'Cierre del día':
• ¿Qué concepto de TypeScript te costó más entender hoy?
• ¿Qué ventaja concreta viste de TypeScript vs JavaScript puro?
• Total de errores TypeScript al cierre: ___ (lo bajaremos mañana)
 
 (Paolo) 
 1. El concepto mas complejo para mi fue el como configurar los archivos al inicio para que ts funcione con react, la mayoria de la configuracion inicial fue compleja, ya luego solo fue ir dando los tipos de valores a los datos enviados/esperados de nuestros componentes
 2. La ventaja que veo es que ts a comparacion de js podemos encontrar los errores al momento de compilar codigo y no en la ejecucion del programa

## Errores al final del bloque F : 36