#!/bin/bash

cd pfk-api
git pull

sudo pm2 stop src/server.js
sudo npm install
sudo pm2 start src/server.js
sudo pm2 save
