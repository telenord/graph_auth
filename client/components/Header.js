import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import logout from '../queries/Logout';

class Header extends Component {

  onLogoutClick(){
    this.props.mutate({
      refetchQueries:[{query}]
    })
  }

  renderButtons() {
    const {data: {user}, loading} = this.props;
    console.log('user', user);
    if (loading) {
      return <div> ...loading </div>;
    }

    if (user) {
      return (
        <li>
          <a onClick={()=>this.onLogoutClick()}>Logout</a>
        </li>
      )
    } else {
      return (<div>
        <li>
          <Link to={'/signup'}>Sign Up</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
      </div>)
    }

  }

  render() {

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'}>Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>

    )
  }
}


Header = graphql(logout)(Header);
Header = graphql(query)(Header);
export default Header;