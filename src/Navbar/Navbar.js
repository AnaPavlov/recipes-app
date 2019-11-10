import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import loginIcon from '../Assets/Icons/login-icon.png';
import logOutIcon from '../Assets/Icons/logged-icon.png';

import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';

import styles from './Navbar.module.css';

class Navbar extends Component {
  state = {
    searchInp: '',
    showLogin: false,
    showLogout: false,
    email: '',
    password: '',
    isLogged: false
  };

  componentDidMount () {
    if (localStorage.getItem("user")) {
      this.setState({
        isLogged: true
      })
    }
  }

  searchHandler = e => {
    this.setState({
      searchInp: e.target.value
    });
    this.props.history.replace('/search/' + e.target.value);
  };

  showLogin = () => {
    this.setState({
      showLogin: true
    });
  };

  closeModal = () => {
    this.setState({
      showLogin: false
    });
  };

  logoutToggle = () => {
    this.setState({
      showLogout: !this.state.showLogout
    });
  }

  handleChange= e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault();
    const user = {email: this.state.email, password: this.state.password}
    this.setState({
      isLogged: true,
      showLogin: false
    });
    localStorage.setItem("user", JSON.stringify({user}));
  }

  logoutHandler = () => {
    localStorage.removeItem("user");
    this.setState({
      isLogged: false,
      showLogout: false
    });
    this.props.history.push('/');
  }

  render(props) {

    let showLogout = this.state.showLogout ? (
      <div className={styles.logout}>
        <h5>Are you sure you want to logout?</h5>
        <button onClick={this.logoutHandler}>Yes</button><button onClick={this.logoutToggle}>No</button>
      </div>
    ) : null;

    let userLinks = this.state.isLogged ? (
      <>
        <div className={styles.login} onClick={this.logoutToggle}>
          <img src={logOutIcon} alt="" />
          {showLogout}
        </div>
        <NavLink activeClassName={styles.active} to="/mymeals">
          My meals
        </NavLink>
      </>
    ) : (
      <div className={styles.login} onClick={this.showLogin}>
        <img src={loginIcon} alt="" />
      </div>
    );

    let navLinks =
      this.props.location.pathname === '/' ? (
        <>
          <a href="#about">
            About us
            </a>
          
          <a href="#contact">
            Contact
          </a>
        </>
      ) : (
        <NavLink activeClassName={styles.active} exact to="/">
          Home
        </NavLink>
      );

    let loginForm = (
      <div className={styles.wrap}>
        <h2>Sign in</h2>
        <form onSubmit={this.submitHandler}>
          <input type="email" name="email" value={this.state.email} placeholder="E-mail" onChange={(e) => this.handleChange(e)} required/>
          <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleChange(e)} required/>
          <button>Submit</button>
        </form>
      </div>
    );

    return (
      <div className={styles.navbar}>
        <Backdrop isVisible={this.state.showLogin} onClick={this.closeModal} />
        <Modal isVisible={this.state.showLogin}>{loginForm}</Modal>
        <nav>
          <div>
            <label>Search:</label>
            <input
              type="search"
              placeholder="..."
              onChange={this.searchHandler}
              value={this.state.searchInp}
            />
          </div>
          <section>
            {userLinks}
            {navLinks}
          </section>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
