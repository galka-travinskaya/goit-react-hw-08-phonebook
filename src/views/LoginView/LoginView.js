import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../redux/auth';
import s from './LoginVeiw.module.css';
import Button from '@material-ui/core/Button';

class LoginView extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onLogin(this.state);
    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className={s.content}>
        <h1 className={s.title}>Войдите в аккаунт</h1>

        <form
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className={s.form}
        >
          <label>
            Почта
            <input
              type="email"
              name="email"
              value={email}
              className={s.field}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              name="password"
              value={password}
              className={s.field}
              onChange={this.handleChange}
            />
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={s.btn}
          >
            Войти
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLogin: logIn,
};

export default connect(null, mapDispatchToProps)(LoginView);
