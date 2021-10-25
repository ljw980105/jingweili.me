## Setup environment variables

* Setup the environment variables in the `.env` file.
* Modify `setenv.ts` with any new variables you've added.
* Execute the command in the root directory to set the environment variables:
  ```shell
    npm run config -- --environment=prod
  ```
  * Never commit the changes in `environment.prod.ts`!

## Deploy
```shell
    sudo service nginx stop
    ng build --prod
    sudo service nginx start
  ```
