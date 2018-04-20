import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import signup from '../queries/Signup';
import query from '../queries/CurrentUser';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{query}]
    })
      .then(()=>{
        this.setState({errors:[]})
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors})
      });
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={({email, password}) => this.onSubmit({email, password})}
        />
      </div>
    )
  }
}

export default graphql(signup)(Signup);