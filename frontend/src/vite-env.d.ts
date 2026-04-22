/// <reference types="vite/client" />

/*
Por qué: TS no sabe que estás usando Vite.

Solución: Debes crear un archivo llamado src/vite-env.d.ts y pegar esta línea: 

 <reference types="vite/client" />. 

 Eso le "abre los ojos" a TypeScript sobre las variables de entorno de Vite.
*/