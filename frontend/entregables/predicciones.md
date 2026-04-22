Predicción A
✍ Antes de ejecutar — escribe en tu predicciones.md

¿Qué archivo generará el comando de instalación además de actualizar package.json?

¿Qué opciones del tsconfig.json son específicas para React con JSX?

(Paolo)Escribe tu respuesta aquí: 
1. se actualizara package y package lock, el primero para las versiones y el segundo para las versiones de las dependencias usadas tambien, asi si joel clona el proyecto funcionara exactamente igual que en mi pc.
2. Las mas importante revisando el documento son     "jsx": "react-jsx" y el strict, el primero para que entienda que trabajara con la version +17 de react y la segunda para activar el supervisor de typescript, asi encontramos errores antes de ejecutar el proyecto.

(Joel)Escribe tu respuesta aquí: 
1. Ademas de actualizar el package.json se creara el archivo tsconfig.json que es el archivo de configuracion de typescript.
2. Las opciones mas importantes son:
    - "jsx": "react-jsx" -> Esto sirve para que typescript entienda que trabajara con react.
    - "strict": true -> Con esto typescript activa el supervisor de typescript de modo que localize los errores antes de ejecutar el proyecto.

Predicción B
✍ Antes de ejecutar — escribe en tu predicciones.md
¿Cuántos archivos vas a renombrar en total? Lista sus nombres.
¿En qué tipo de líneas crees que aparecerá el primer error TS?

(Paolo)Escribe tu respuesta aquí: 
1. En total serian 11 NavBar, PlatoCard, MesaCard, MenuPage, MesasPage, CarritoPage, DetalleMesa, NotFound, PedidoContext, App, main
2. En todas las lineas donde llamamos parametros sin especificar el tipo de valor, mas de 20 creo

(Joel)Escribe tu respuesta aquí: 
1. Los archivos a renombrar son los siguientes:
    - NavBar.jsx -> NavBar.tsx
    - PlatoCard.jsx -> PlatoCard.tsx
    - MesaCard.jsx -> MesaCard.tsx
    - MenuPage.jsx -> MenuPage.tsx
    - MesasPage.jsx -> MesasPage.tsx
    - CarritoPage.jsx -> CarritoPage.tsx
    - DetalleMesa.jsx -> DetalleMesa.tsx
    - NotFound.jsx -> NotFound.tsx
    - PedidoContext.jsx -> PedidoContext.tsx
    - App.jsx -> App.tsx
    - main.jsx -> main.tsx

2. Los errores apareceran en todas las lineas donde los parametros no tengan un tipo de valor asignado (ej: number, string, boolean, object, array, etc).

Predicción C
✍ Antes de modificar PlatoCard.tsx — escribe en predicciones.md
El componente PlatoCard recibe un plato como prop. ¿Qué propiedades tiene un plato según el modelo de datos del sistema?
¿Qué tipo TypeScript corresponde a cada una? Escríbelo aquí antes de ver el código:
_id:          ___________
nombre:       ___________
precio:       ___________
categoria:    ___________
disponible:   ___________

(Paolo) plato tiene el siguiente segun el backend que obtenemos de railway:
_id:          string
nombre:       string
precio:       number
stock:        number
categoria:    string

(Joel) Las propiedades del plato son las siguientes: 

- _id:          string
- nombre:       string
- descripcion:  string
- precio:       number
- categoria:    string
- disponible:   boolean

⏱ Feedback 30 segundos — Bloque C
Anota en reflexion.md sección C:
• ¿El tipado de 'onAgregar' fue lo que esperabas?  ¿Qué significa '(plato: Plato) => void'?

(Paolo) No fue lo que esperaba, ya que habia una llamada en contexto dentro de platocard, tuvimos que averiguar como solucionar lo del contexto y agregamos las interfaces, cosa que parece que se avanza en el dia 2, pero si se logro entender como se tipean la interface para el componente