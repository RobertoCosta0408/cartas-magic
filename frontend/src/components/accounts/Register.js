import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import zxcvbn from 'zxcvbn';


export class Register extends Component {
  constructor(props) {
    super(props);
  
     this.password_strenght = 0;
  }
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
    }

    static propTypes = {
      register: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
  }
  
  
    onSubmit = e => {
        e.preventDefault();
        const { username, email, first_name, last_name, password, password2 } = this.state;
        if( password != password2 ){
          this.props.createMessage({ passwordNotMatch: 'Passwords do not match.' });
        }
        else if (this.password_strenght < 3){
          this.props.createMessage({ passwordNotMatch: 'Password is too weak.' });
        }
        else{
          const newUser = {
            username,
            email,
            first_name,
            last_name,
            password
          }
          this.props.register(newUser);
        }
    }

  
    onChange = e => {
      if (e.target.name == "password"){
        this.password_strenght = zxcvbn(e.target.value).score;

        if (this.password_strenght < 3){
          this.setState({ [e.target.name]: e.target.value });
        }
        else{
          this.setState({ [e.target.name]: e.target.value });
        }
      }
      else{
        this.setState({ [e.target.name]: e.target.value });
      }
    
    };
    
    render() {
        if(this.props.isAuthenticated){
          return <Redirect to="/" />;
        }

        const { username, first_name, last_name, email, password, password2 } = this.state;


        return (
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Register</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                  />
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="first_name"
                    onChange={this.onChange}
                    value={first_name}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="last_name"
                    onChange={this.onChange}
                    value={last_name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage }) (Register);