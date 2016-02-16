### Branch off of dev please.
---
## Updating submodule
  1. If you just cloned the repo
```bash
$ git submodule init
```
  2. To pull down updates to dev (or current branch specified in .gitmodules)
```bash
$ git submodule update --remote
```
  3. More info on git submodules here: [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

## To run decoupled locally (temporary, will be updated)
  1. In one shell (runs the API back-end)
```bash
$ gulp
```
  2. In another shell window (relative to this project directory)
```bash
$ cd ./fly-by-frontend
$ grunt serve
```

## To run locally
1. Build the front-end and copy it to public on back-end (relative to this project directory)
```bash
$ cd ./fly-by-frontend
$ grunt build
$ grunt copyup
$ cd ..
$ gulp
```

## CF Instructions
  1. Create an account here: [http://run.pivotal.io/](http://run.pivotal.io/)
  2. Download and install CLI tool: [Mac OSX CF CLI tool](https://cli.run.pivotal.io/stable?release=macosx64&source=pws)
  3. Login to the CLI
```bash
$ cf login -a https://api.run.pivotal.io
Email: email@gmail.com
Password: ••••••••
```
  4. With environment variables in ./.profile.d/setenv.sh in terminal run:
```bash
cf push
```
