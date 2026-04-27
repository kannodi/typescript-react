# Predicción A
✍  Antes de ejecutar — escribe en tu predicciones.md
¿Qué tipo tiene la variable data si escribes const data = await getMesas()? ¿TypeScript lo infiere o necesitas declararlo explícitamente?

Tipo de data después del await: mesa[]
Tipo del parámetro err en el catch: unknown

(Paolo) Segun lo que esperamos del backend el tipo de la variable data es mesa[] un arreglo de mesas
(Paolo) ts ya lo infiere, ya lo hemos declarado en index.ts el molde que seguira getMesas al traer archivos

(Joel) 
Tipo de data despues del await : Mesas[]
Tipo del parametro err en el catch: Error
Typescript lo infiere, no necesita ser declarado explicitamente.

# Predicción B
✍  Antes de ejecutar — escribe en tu predicciones.md
CarritoPage usa pedido del Context para construir el body del POST. ¿Cuántos campos tiene ese objeto? Lista los que deben ir en el body según la interface Pedido.
Campos que van en el body: ___________
Campos que NO van (los excluye Omit): ___________

(Paolo) Lo que va en el body es: mesaId,tipo,estado ,items y total
(Paolo) lo que excluimos con omit son el id y el createdat del backend
