# ⏱ Feedback 30 segundos — Bloque A
• ¿Tiene sentido tener un único archivo de tipos? ¿Qué ventaja concreta ves frente a declarar los tipos en cada componente?
• Anota en reflexion.md sección A.
(Paolo)Si, es tener mejor un solo archivo donde se concentre todo acerca de las interfaces y types, la ventaja es tener todo mas ordenado + 
# ⏱ Feedback 30 segundos — Bloque B
• ¿Qué pasa con el autocompletado en el IDE ahora que los tipos están en un solo lugar?
• Anota en reflexion.md sección B.

# ⏱ Feedback 30 segundos — Bloque C
• ¿Qué error de runtime podría haberse producido sin el guard if (!context) throw? Piensa en un escenario concreto.
• Anota en reflexion.md sección C.

# ⏱  Bloque D
✓  El par hizo al menos 3 preguntas a Claude y discutió las respuestas
✓  reflexion.md sección D tiene anotado al menos un concepto nuevo que aprendieron

# ⏱   Bloque E - EVALUACION ENTRE PARES 🔄 Instrucciones para la evaluación
Ronda 1 (12 min): Persona A explica. Persona B hace las preguntas de abajo.
Ronda 2 (12 min): Invierten. Persona B explica. Persona A hace las preguntas.

1. ¿Qué archivo creamos hoy que no existía antes? ¿Para qué sirve?

2. Abre el archivo types/index.ts. Sin leerlo, ¿puedes listar de memoria
   cuántos types y cuántas interfaces hay? ¿Cuál es la diferencia entre ellos?

3. ¿Por qué PedidoContext usa createContext<PedidoContextType | undefined>
   en lugar de createContext<PedidoContextType>? Explícalo sin código.

4. Si mañana el backend agrega un campo activo: boolean a Mesa,
   ¿en cuántos archivos tienes que hacer el cambio? ¿Cómo TypeScript
   te va a avisar dónde falta el campo?

5. ¿Qué hace el hook usePedido()? ¿Por qué es mejor que llamar
   useContext(PedidoContext) directamente en cada componente?

# CRITERIO 
✓  Ambas personas respondieron todas las preguntas (puede ser con ayuda del código)
✓  Las respuestas a las preguntas 3 y 5 fueron sin leer directamente el código
✓  reflexion.md sección E tiene anotado qué concepto fue el más difícil de explicar

# ⏱  Feedback 30 segundos — Bloque F — Cierre del día
• ¿Qué concepto de TypeScript te costó más entender hoy?
• ¿Qué ventaja concreta viste de centralizar los tipos en types/index.ts?
• Total de errores TypeScript al cierre del Día 2: ___ (los eliminaremos mañana)
• Anota en reflexion.md sección "Cierre del día".
