import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/auth';
import s from './Register.module.css';
import Button from '@material-ui/core/Button';

class RegisterView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onRegister(this.state);
    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <div className={s.content}>
        <h1 className={s.title}>Регистрация</h1>

        <form
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className={s.form}
        >
          <label>
            Имя
            <input
              type="text"
              name="name"
              value={name}
              className={s.field}
              onChange={this.handleChange}
            />
          </label>
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
            Зарегистрироваться
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onRegister: register,
};

export default connect(null, mapDispatchToProps)(RegisterView);
