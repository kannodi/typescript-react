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