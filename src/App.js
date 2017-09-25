import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    auth: '',
    users: '',
    user: '',
    authState: null,
    usersState: null,
    userState: null,
    token: ''
  }
  baseUrl = '/api'
  testAuthenticator = (bad) => {
    const body = {
      username: 'user@email.com',
      password: 'password'
    }
    fetch(`${this.baseUrl}/login`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: bad
        ? null
        : JSON.stringify(body)
    }).then(r => {
      if (r.status !== 200)
        return r.json().then(j => {
          throw j;
        });
      return r.json();
    }).then(r => {
      this.setState({
        token: r.token,
        authState: true,
        auth: `${JSON.stringify(r, null, 4)}`
      });
    }).catch(e => {
      this.setState({
        authState: false,
        auth: `${JSON.stringify(e, null, 4)}`
      });
    });
  }
  testUsers = (bad) => {
    const creds = `Basic ${btoa('user@email.com:' + document.getElementById('authToken').value)}`
    fetch(`${this.baseUrl}/users`, {
      method: 'get',
      headers: {
        'authorization': bad
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
      this.setState({
        usersState: true,
        users: `${JSON.stringify(r, null, 4)}`
      });
    }).catch(e => {
      this.setState({
        usersState: false,
        users: `${JSON.stringify(e, null, 4)}`
      });
    });
  }

  testUser = (bad) => {
    const creds = `Basic ${btoa('user@email.com:' + document.getElementById('authToken').value)}`
    fetch(`${this.baseUrl}/users${bad === 2
      ? 'ss'
      : ''}/3`, {
      method: 'get',
      headers: {
        'authorization': bad === true
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
      this.setState({
        userState: true,
        user: `${JSON.stringify(r, null, 4)}`
      });
    }).catch(e => {
      this.setState({
        userState: false,
        user: `${JSON.stringify(e, null, 4)}`
      });
    });
  }

  render() {
    return (
      <div className="app-container">
        <header>
          <h1>ExpressJS Routing Tester
            <a href="swagger" target="_blank">Open Swagger</a>
          </h1>
        </header>

        <div className="container">
          <h3>Authenticate</h3>
          <small>Token</small>
          <div><input id="authToken" value={this.state.token}/></div>
          <h5>Send Request</h5>
          <div>
            <button onClick={() => this.testAuthenticator(true)}>Send bad Request</button>
            <button onClick={() => this.testAuthenticator()}>Send actual Request</button>
          </div>
          <h5>Response</h5>
          <div>
            {this.state.authState && <p className="pass">PASS</p>}
            {this.state.authState === false && <p className="fail">FAIL</p>}
            <pre>{this.state.auth}</pre>
          </div>
          <hr/>

          <h3>Get Users</h3>
          <h5>Send Request</h5>
          <div>
            <button onClick={() => this.testUsers(true)}>Send unauthorized Request</button>
            <button onClick={() => this.testUsers()}>Send actual Request</button>
          </div>
          <h5>Response</h5>
          <div>
            {this.state.usersState && <p className="pass">PASS</p>}
            {this.state.usersState === false && <p className="fail">FAIL</p>}
            <pre>{this.state.users}</pre>
          </div>
          <hr/>

          <h3>Get User</h3>
          <small>Missing query call, should fail on server and respond with 404</small>
          <h5>Send Request</h5>
          <div>
            <button onClick={() => this.testUser(true)}>Send unauthorized Request</button>
            <button onClick={() => this.testUser(2)}>Send bad Route</button>
            <button onClick={() => this.testUser()}>Send actual Request</button>
          </div>
          <h5>Response</h5>
          <div>
            {this.state.userState && <p className="pass">PASS</p>}
            {this.state.userState === false && <p className="fail">FAIL</p>}
            <pre>{this.state.user}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
