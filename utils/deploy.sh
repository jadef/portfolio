#!/bin/bash

# This script performs deployment tasks against dreamhost

## ---- CONFIGS
set -u
# ensure dotfiles are included in tarball
shopt -s dotglob
# ensure globs that fail to match will return null
shopt -s nullglob
# ensure globbing ignores special paths . and ..
GLOBIGNORE=.:..

stamp=$(date +%Y-%m-%d-%H-%M)
root="$PWD"
src="public"
ssh_opts="-o PasswordAuthentication=no"
deploy_host="jadefaist.com"
deploy_user="faist13"
deploy_connect="${deploy_user}@${deploy_host}"
deploy_package="jadefaist-deploy-${stamp}.tgz"
tar_create_opts="czf"
tar_deflate_opts="xzf"
tar_deflate_mods="--keep-newer-files"
target_url="jadefaist.com"
target_docroot="/home/faist13/jadefaist.com"

## ---- FUNCTIONS
function check_dependencies() {
  echo "Checking dependencies..."
  if ! hash unzip
  then
    echo -e "FATAL: utility 'unzip' not found!\n\t$(whereis unzip)"
    exit 1
  fi
  ssh "${ssh_opts}" "${deploy_connect}" "true"
  rc=$?
  if [ $rc -ne 0 ]
  then
    echo "FATAL: failure to SSH as '${deploy_connect}'"
    exit 1
  fi
  echo "Authentication successful!"
  if [ "$target_docroot" == "" ]
  then
    echo "FATAL: target docroot is undefined!"
    exit 1
  fi
  echo -e "Success! Dependencies satisfied.\n"
}

function prepare_release() {
  echo "Preparing release..."

  echo 'TODO: run build npm script here.'
  echo 'TODO: ignore .DS_Store files in package'

  ## Package release
  # move into the release directory so the tarball deflates in place
  cd "${src}"
  tar "${tar_create_opts}" "${deploy_package}" *
  ls -lah "${deploy_package}"
  # mv "${root}/${src}/${deploy_package}" "${root}"
  # cd "${root}"
  echo -e "Release prepared.\n"
}

function deploy_release() {
  echo "Deploying the release..."
  scp "${ssh_opts}" "${deploy_package}" "${deploy_connect}:/tmp/"
  # clear out old release files
  echo "Removing old release..."
  # NOTE: if this line fails then connect as root and run the rm -rf to delete everything then re-run the build!
  ssh "${ssh_opts}" "${deploy_connect}" "cd ${target_docroot} && pwd && rm -rf *"
  # check for success in preparing the file system
  rc=$?
  if [[ "$rc" -ne "0" ]]; then
    msg="FATAL: unable to remove old release! Exiting deployment"
    echo "${msg}"
    handle_deploy_failure
  fi
  unpack_release
}

function unpack_release() {
  echo "Unpacking release..."
  ssh "${ssh_opts}" "${deploy_connect}" "mv /tmp/${deploy_package} ${target_docroot}/ && cd ${target_docroot} && pwd && tar ${tar_deflate_opts} ${deploy_package} ${tar_deflate_mods}"
  # check for success in unpacking the release
  rc=$?
  if [[ "$rc" -ne "0" ]]; then
    msg="FATAL: unable to unpack the new release! Exiting deployment"
    echo "${msg}"
    handle_deploy_failure
  fi
}

function cleanup_deploy() {
  ssh "${ssh_opts}" "${deploy_connect}" "rm -f /tmp/${deploy_package} && rm -f ${target_docroot}/${deploy_package}"
  rm "${deploy_package}"
}

function handle_deploy_failure() {
  cleanup_deploy
  # non-zero exit code to indicate build failure
  exit 1
}

# gather the routines
function main() {
  check_dependencies
  prepare_release
  deploy_release
  cleanup_deploy
}

# run the routine
main

echo -e "\nDone."

# explicit return code
exit 0
