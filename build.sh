#!/usr/bin/env bash
# Compila src/app.jsx -> app.js (sin Babel en el navegador, carga más rápido y funciona offline)
set -e
cd "$(dirname "$0")"
npx --yes esbuild@0.24 src/app.jsx --loader:.jsx=jsx --minify --target=es2019 --outfile=app.js
# Recuerda: al publicar cambios, sube a la vez CACHE en sw.js y APP_VERSION en index.html (deben coincidir).
