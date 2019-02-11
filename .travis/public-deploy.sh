#!/bin/bash

setup_ssh() {
    eval "$(ssh-agent -s)"
    chmod 600 .travis/deploy.key
    ssh-add .travis/deploy.key
    ssh-keyscan ${REMOTE_HOST} >> $HOME/.ssh/known_hosts
    ssh-keyscan ${REMOTE_HOST_IP} >> $HOME/.ssh/known_hosts
}
setup_git() {
  git config user.email "travis@travis-ci.org"
  git config user.name "Travis CI"
}

commit_files() {
  node .travis/public-patch.js
  git add .
  git commit --message "Version: $PACKAGE_VERSION Commit: $TRAVIS_COMMIT"
}

upload_files() {
  git push --quiet --set-upstream deploy master
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
  setup_git
  commit_files
  upload_files
fi
