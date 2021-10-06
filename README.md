# ECOMASH mod of AIRMASH


## Setup services
1. [leaderboard](https://github.com/eco-community/ecomash-frontend/tree/master/leaderboard)
2. [backend](https://github.com/wight-airmash/ab-server)


## Building and deployment
1. Change `modBackendUrl` in `src/Game.js` to the correct backend url
2. `npm install && npm run build` 

The output will be created in `dist/`, and can be served using a local web server for testing (e.g. something like `cd dist ; python3 -m http.server`).

For development, `DEBUG=1 npm run build` cuts build time down by disabling minification.

<img width="1038" alt="imagen" src="https://user-images.githubusercontent.com/13070119/131256412-8ec027ba-a642-45d0-bf42-33825a92060b.png">

