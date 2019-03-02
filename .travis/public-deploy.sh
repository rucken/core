#!/bin/bash

# REMOTE_HOST=https://domain.name
# REMOTE_HOST_IP=127.0.0.1
# REMOTE_HOST_GIT_URL=dokku@127.0.0.1:dokku-app-name

# For testing public-deploy.sh on local machine, set LOCAL=true

setup_ssh() {
    eval "$(ssh-agent -s)"
    chmod 600 .travis/deploy.key
    ssh-add .travis/deploy.key
    ssh-keyscan ${REMOTE_HOST} >> $HOME/.ssh/known_hosts
    ssh-keyscan ${REMOTE_HOST_IP} >> $HOME/.ssh/known_hosts
}
create_folder(){
  rm -rf ./deploy
  mkdir deploy
}
setup_git() {
  git config user.email "travis@travis-ci.org"
  git config user.name "Travis CI"
  cd deploy
  git init
  git remote add deploy "${REMOTE_HOST_GIT_URL}" > /dev/null 2>&1
  git config push.default simple
  git remote -v
  git fetch deploy master
  git pull deploy master
  cd ..
}
copy_files() {
  ./scripts/postinstall.sh
  rm -rf ./deploy/scripts
  rm -rf ./deploy/dist
  mkdir ./deploy/scripts
  mkdir ./deploy/dist
  cp -av ./dist/* ./deploy/dist
  cp -av ./package.json ./deploy/package.json 
  cp -av ./.gitignore ./deploy/.gitignore
  cp -av ./server.js ./deploy/server.js
  node ./.travis/public-patch.js
}
commit_files() {
  rm -rf .git
  cd deploy
  git add .
  git commit --message "Version: $PACKAGE_VERSION Commit: $TRAVIS_COMMIT"
  git push --quiet --set-upstream deploy master
  cd ..
}

upload_files() {
  rm -rf .git
  cd deploy
  git push deploy master
  cd ..
}

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  PACKAGE_VERSION=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
  export PACKAGE_VERSION=$PACKAGE_VERSION

  setup_ssh
  create_folder
  setup_git
  copy_files
  commit_files
  upload_files
fi
if [[ $LOCAL == 'true' ]]
then
  create_folder
  copy_files
fi
