#!/bin/bash

cd pfk-api
git pull

sudo pm2 stop index.js
sudo npm install
sudo pm2 start :windex.js
