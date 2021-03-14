import { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import contactsOperations from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import Alert from '../Alert';

import s from './ContactForm.module.css';
import alert from '../../transition/Transition.module.css';
import Button from '@material-ui/core/Button';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    showAlert: false,
    errorMessage: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (!name || !number) {
      this.toggleAlert('The list is empty');
      return;
    }

    if (
      this.props.contacts.find(
        ({ name }) => name.toLowerCase() === this.state.name.toLowerCase(),
      )
    ) {
      this.toggleAlert('Contact is already exist');
      this.reset();
      return;
    }

    this.props.onSubmit(name, number);

    this.reset();
  };

  toggleAlert = message => {
    this.setState({ showAlert: true, errorMessage: message });
    setTimeout(() => this.setState({ showAlert: false }), 1000);
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { showAlert, errorMessage } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <CSSTransition
          in={showAlert}
          timeout={250}
          classNames={alert}
          unmountOnExit
        >
          <Alert>
            <p>{errorMessage}</p>
          </Alert>
        </CSSTransition>
        <label className={s.label}>
          <span className={s.text}>Имя</span>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        <label className={s.label}>
          <span className={s.text}>Номер</span>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (newName, number) =>
    dispatch(contactsOperations.addContact(newName, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
