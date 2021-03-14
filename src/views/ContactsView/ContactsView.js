import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import Filter from '../../components/Filter';
import { contactsOperations } from '../../redux/contacts';

import s from './ContactsView.module.css';

class ContactsView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <section className={s.section}>
        <div className={s.container}>
          <ContactForm />

          <h2>Контакты</h2>
          <Filter />

          <ContactList />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(null, mapDispatchToProps)(ContactsView);
