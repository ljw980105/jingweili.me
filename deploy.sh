#!/bin/sh

# two arguments -
# 1. branch of angular site
# 2. branch of vapor backend
sudo service nginx stop

# angular
cd jingweili.me
git fetch --all
git checkout $1
ng build --prod
cd ..

# vapor
cd jingweili.me-backend
git fetch --all
git checkout $2
vapor build
vapor run &> output.log &
cd ..

sudo service nginx start
