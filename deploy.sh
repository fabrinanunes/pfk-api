#!/bin/bash

cd pfk-api
git pull

sudo pm2 stop server.js
sudo npm install
sudo pm2 start server.js
