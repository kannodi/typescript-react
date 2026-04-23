# Predicción A
✍  Antes de ejecutar — escribe en tu predicciones.md
¿Qué archivos del proyecto actual ya tienen declaradas interfaces que van a quedar duplicadas cuando crees types/index.ts? Listarlos antes de continuar.
Archivos con tipos duplicados: 
(Paolo) Quedaran duplicados los archivos que hicimos el dia de ayer MesaCard.tsx y PlatoCard.tsx
Tipos que se repiten: 
(Paolo) Los tipos que creamos ayer Interface Mesa y la interface Plato


(Joel)
Archivos con tipos duplicados:
- api.ts (tiene interfaces para Mesa, Plato, PedidoItem)
- PlatoCard.tsx (tiene su propia interfaz Plato)
- MesaCard.tsx (tiene su propia interfaz Mesa)
Tipos que se repiten:
- Interfaz Mesa
- Interfaz Plato


# Predicción B
✍  Antes de ejecutar — escribe en tu predicciones.md
¿Cuántas interfaces/types duplicados hay en total en api.ts, PlatoCard.tsx y MesaCard.tsx que vas a eliminar en este bloque?
Cantidad de declaraciones duplicadas que vas a eliminar: ___
Tipos que se van a eliminar de api.ts: 

(Paolo) Hay alrededor de 7 tipos, ahora quitaremos las interfaces de cada archivo y empezaremos a importar las interfaces desde index.ts

(Joel) 
Cantidad de declaraciones duplicadas que vas a eliminar: 3
Tipos que se van a eliminar de api.ts: 
- Tipo Mesa
- Tipo Plato
- Tipo PedidoItem


# Predicción C
✍  Antes de ejecutar — escribe en tu predicciones.md
PedidoContext actualmente tiene 5 funciones: agregarPlato, quitarPlato, cambiarTipo, asignarMesa y limpiarPedido. ¿Cuál es el tipo exacto de cada parámetro según los modelos en types/index.ts?
1. agregarPlato recibe:
(Paolo) plato: Plato
2. quitarPlato recibe: 
(Paolo) platoId: string
3. cambiarTipo recibe: 
(Paolo) tipo: TipoPedido
4. asignarMesa recibe: 
(Paolo) mesaId: string
5. limpiarPedido recibe: 
(Paolo) no recibe ningun parametro


(Joel)
PedidoContext actualmente tiene 5 funciones:
1. agregarPlato recibe: plato: Plato
2. quitarPlato recibe: platoId: string
3. cambiarTipo recibe: tipo: TipoPedido
4. asignarMesa recibe: mesaId: string
5. limpiarPedido recibe: No recibe ningun parametro