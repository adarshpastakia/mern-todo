// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

const baseUrl = '/api'
const testAuthenticator = (auth) => {
  const body = {
    username: 'user@email.com',
    password: 'password'
  }
  fetch(`${baseUrl}/login`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: !auth
      ? null
      : JSON.stringify(body)
  }).then(r => {
    if (r.status !== 200)
      return r.json().then(j => {
        throw j;
      });
    return r.json();
  }).then(r => {
    document.getElementById('authToken').value = r.token;
    document.getElementById('authResponse').innerHTML = `PASS<pre>${JSON.stringify(r, null, 4)}</pre>`
  }).catch(e => {
    document.getElementById('authResponse').innerHTML = `FAIL<pre>${JSON.stringify(e, null, 4)}</pre>`
  });
}
const testUsers = (auth) => {
  const creds = `Basic ${btoa('user@email.com:' + document.getElementById('authToken').value)}`
  fetch(`${baseUrl}/users`, {
    method: 'get',
    headers: {
      'authorization': !auth
        ? null
        : creds
    }
  }).then(r => {
    if (r.status !== 200)
      return r.json().then(j => {
        throw j;
      });
    return r.json();
  }).then(r => {
    document.getElementById('usersResponse').innerHTML = `PASS<pre>${JSON.stringify(r, null, 4)}</pre>`
  }).catch(e => {
    document.getElementById('usersResponse').innerHTML = `FAIL<pre>${JSON.stringify(e, null, 4)}</pre>`
  });
}

const testUser = (auth) => {
  const creds = `Basic ${btoa('user@email.com:' + document.getElementById('authToken').value)}`
  fetch(`${baseUrl}/users${auth == 2
    ? 's'
    : ''}/3`, {
    method: 'get',
    headers: {
      'authorization': !auth
        ? null
        : creds
    }
  }).then(r => {
    if (r.status !== 200)
      return r.json().then(j => {
        throw j;
      });
    return r.json();
  }).then(r => {
    document.getElementById('userResponse').innerHTML = `PASS<pre>${JSON.stringify(r, null, 4)}</pre>`
  }).catch(e => {
    document.getElementById('userResponse').innerHTML = `FAIL<pre>${JSON.stringify(e, null, 4)}</pre>`
  });
}
