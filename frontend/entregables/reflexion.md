# ⏱  Feedback 30 segundos — Bloque A
• ¿Por qué err es unknown y no Error directamente? ¿Qué ventaja real da eso?
• Anota en reflexion.md sección A.
(Paolo) Porque los errores siempre son inesperados, podrian tener muchas formas, con unknown nos aseguramos que capte cualquier cosa
(Joel) Porque unknown nos obliga a validar que el error sea del tipo Error, lo cual es mas seguro.

# ⏱ Feedback 30 segundos — Bloque B
• ¿Omit<Pedido, ...> fue lo que esperabas? ¿Cuándo usarías Omit en otros contextos del proyecto?
• Anota en reflexion.md sección B.

(Paolo) El concepto es facil de comprender pero al usarlo no tanto, en el proyecto lo usamos para enviar un pedido body exceptuando el id y el createdat. En otro contexto, si quiero mostrar mi usuario y esta dentro de un objeto que tenga usuario y contraseña, solo hago omit contraseña.

(Joel) Entender como funcione fue sencillo, en este caso lo usamos para no enviar el id y el created_at del pedido; usaria omit para quitar el password de usuario en el frontend.

# ⏱  Feedback 30 segundos — Bloque C
• ¿El comportamiento de useParams te sorprendió? ¿Por qué el genérico no garantiza el tipo?
• Anota en reflexion.md sección C.

(Paolo) Me confundio un tanto el entender como el generico ya usaba el undefined, pero entendi que esto se hace asi por los creadores de react router, para luego crear un guard y filtrarlo solo por string, asi cuando usemos el id sabemos que si o si es un string y no colapsaria

(Joel) Si, me tomo por sorpresa, el genérico en useParams<T>() no garantiza el tipo de ejecución, mas bien es una ayuda para el desarrollador ya que TS no tiene control sobre los valores de la URL en tiempo de ejecución.

# ⏱  Feedback 30 segundos — Bloque D
• ¿Cuántos errores había al inicio del Día 1? ¿Y ahora? Anota la diferencia en reflexion.md sección D.
• ¿Qué error fue el más difícil de resolver en los 3 días? ¿Por qué?

# ⏱  Exploración con Claude - Bloque E  
Objetivo: Cerrar los 3 días con preguntas reales. No preguntas de ejercicio — preguntas sobre cosas que no quedaron claras o que generan curiosidad sobre el siguiente paso.

1. "Después de tipar 3 días el proyecto restaurante-frontend,
   ¿qué tipo de errores de runtime previene TypeScript y cuáles NO?
   Dame un ejemplo concreto de cada uno usando nuestro código."

2. "En DetalleMesa.tsx usamos useParams<{ mesaId: string }>() pero
   mesaId sigue siendo string | undefined. ¿Por qué el genérico no
   garantiza que es string? ¿Es un bug de TypeScript o una decisión intencional?"

3. "Tengo Omit<Pedido, "_id" | "creadoEn" | "actualizadoEn"> en CarritoPage.
   ¿Qué otros utility types de TypeScript existen que podrían servirme en
   este mismo proyecto? Por ejemplo: ¿para qué sirven Pick, Partial y Required?
   Muéstrame con un ejemplo concreto de Mesa o Plato."

4. "¿Qué es el type narrowing que usamos en useParams y en el guard del Context?
   ¿Cuántos tipos de narrowing existen en TypeScript? Dame un ejemplo de
   cada uno con código del proyecto restaurante."

5. "¿Cuál es la diferencia entre TypeScript en React y TypeScript en Next.js?
   ¿Qué tipos nuevos voy a necesitar aprender cuando empecemos Next.js?
   Muéstrame un ejemplo de un componente server de Next.js tipado."


📊  CRITERIO — Bloque E completado cuando:
✓  El par hizo al menos 3 preguntas y discutió las respuestas
✓  reflexion.md sección E tiene anotado al menos un concepto nuevo que aprendieron

# ⏱  Feedback 30 segundos — Bloque F
✍  Escribe en reflexion.md — sección "Cierre de los 3 días"
• ¿Qué concepto de TypeScript te resultó más difícil en los 3 días?
• ¿Qué error de los 3 días fue el más útil para aprender? ¿Por qué?
• ¿En qué parte del proyecto React del Día 9 detectarías bugs ahora que antes no veías?
• Total de errores al inicio del Día 1: ___  →  Total de errores hoy: 0
• Una cosa que cambiaría de la forma en que escribí JavaScript antes de TypeScript: ___

# ⏱  Feedback 30 segundos — Cierre
• ¿Qué parte del sprint cambiarías si lo hicieras de nuevo?
• Navigator le pregunta al Driver: ¿qué es lo que más recuerdas de TypeScript después de estos 3 días?
