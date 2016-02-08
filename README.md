### Branch off of dev please.
---
## CF Instructions
  1. Create an account here: [http://run.pivotal.io/](http://run.pivotal.io/)
  2. Download and install CLI tool: [Mac OSX CF CLI tool](https://cli.run.pivotal.io/stable?release=macosx64&source=pws)
  3. Login to the CLI
    ```
    $ cf login -a https://api.run.pivotal.io
    Email: email@gmail.com
    Password: ••••••••
    ```
  4. With environment variables in ./.profile.d/setenv.sh in terminal run:
    ``` cf push ```
