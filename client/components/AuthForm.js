import React, { Component } from 'react';

const initialState = {
  email: '',
  password: ''
};

class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState(initialState)
  }

  render() {
    return (
      <div className="row">
        <form className="col s6" onSubmit={(e) => this.onSubmit(e)}>
          <div className="input-field">
            <input
              type="text"
              placeholder={'Email'}
              value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}
              autoComplete={'first'}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={this.state.password}
              placeholder={'Password'}
              onChange={(e) => this.setState({password: e.target.value})}
              autoComplete={'password'}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(err=><div key={err}>{err}</div>)}
          </div>
          <button className={'waves-effect waves-light btn'}>Submit</button>
        </form>
      </div>

    )
  }
}

export default AuthForm;