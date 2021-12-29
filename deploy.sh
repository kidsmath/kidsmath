#!/bin/sh

REV=$(git rev-parse --short HEAD)
DEPLOY_REPO=kidsmath.github.io

if [ ! -d $DEPLOY_REPO ]; then
  git clone git@github.com:kidsmath/$DEPLOY_REPO.git
fi

rm -fr build
yarn run build

# override target
rm -fr $DEPLOY_REPO/*
cp -r build/* $DEPLOY_REPO/
(cd $DEPLOY_REPO; git add .; git commit -m "Deploy $REV"; git push);

