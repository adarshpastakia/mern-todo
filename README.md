# ToDo Application

### Setup Pre-Requisites
- install mongodb
- install NodeJs

### Setup environment
- Install create-react-app globally
  ```shell
  npm i create-react-app -g
  ```
- Create the react application
  ```shell
  # Create react app using the create-react-app global module
  create-react-app MernTodo

  cd MernTodo
  ```
- Install node server dependencies
  ```shell
  # Install express api router
  yarn add express cors body-parser -S

  # Install swagger requirement
  yarn add swagger-jsdoc -S

  # Install mongodb node driver
  yarn add mongodb -s
  ```

---

### Express Overview

Serving mixed routes for api call, swagger and ui. Express work in a chain

```js

// When calling server/login this route will be used
expressApp.get('/login', ...do domething);

// When calling server/login this route will be used
expressApp.get('/swagger', ...serve the swagger ui index file);

// When calling server/uiroute this route will be used
expressApp.get('*', ...serve the react index.html file)
```

In the above if the react application contains a `/login` route in the app during refresh it will be consumed by the `get('/login')` route. Good practice to have api routes prefixed with `/api`.

> NOTE: The `get('*')` must be last in the express chain, when no valid route is found it should serve the react application

It is good to create a router for handling all api calls. The router can then trap unknown api call with a valid 404 response rather go through the chain and end up serving the react application.
