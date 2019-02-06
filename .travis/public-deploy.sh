#!/bin/bash

setup_ssh() {
    eval "$(ssh-agent -s)"
    chmod 600 .travis/deploy.key
    ssh-add .travis/deploy.key
    ssh-keyscan ${REMOTE_HOST} >> $HOME/.ssh/known_hosts
}
setup_git() {
  git config user.email "travis@travis-ci.org"
  git config user.name "Travis CI"
  git remote add public ssh://${REMOTE_HOST_GIT_URL}
  yes | cp -rf .travis/public-gitignore .gitignore
  yes | cp -rf .travis/public-package.json package.json
}

commit_files() {
  git add .
  git commit --message "Version: $PACKAGE_VERSION Commit: $TRAVIS_COMMIT"
}

upload_files() {
  git push public master
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