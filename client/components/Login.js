import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import login from '../queries/Login';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router/';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }
  componentWillUpdate(nextProps){
    if(!this.props.data.user && nextProps.data.user){
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{query}]
    })
      .then(() => {
        this.setState({errors: []})
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors})
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={({email, password}) => this.onSubmit({email, password})}
        />
      </div>
    )
  }
}

Login = graphql(query)(Login);

export default graphql(login)(Login);