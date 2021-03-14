import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import contactTransition from './transitions/ContactTransition.module.css';
import {
  contactsOperations,
  getVisibleContacts,
  getContacts,
} from '../../redux/contacts';
import Button from '@material-ui/core/Button';

import s from './ContactList.module.css';

class ContactList extends Component {
  componentDidUpdate() {
    const contacts = JSON.stringify(this.props.contacts);
    localStorage.setItem('saveContacts', contacts);
  }

  render() {
    const { contacts, allContacts, onRemove } = this.props;
    return (
      <>
        <TransitionGroup component="ul" className={s.list}>
          {contacts.length === 0 && allContacts.length !== 0 ? (
            <CSSTransition in={true} timeout={0} unmountOnExit>
              <li className={s.text}>Countact is not founding</li>
            </CSSTransition>
          ) : (
            contacts.map(({ name, number, id }) => (
              <CSSTransition
                key={id}
                classNames={contactTransition}
                timeout={250}
              >
                <li className={s.items}>
                  <p className={s.text}>
                    {name}: {number}
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => onRemove(id)}
                  >
                    Удалить
                  </Button>
                </li>
              </CSSTransition>
            ))
          )}
        </TransitionGroup>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    contacts: getVisibleContacts(state),
    allContacts: getContacts(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
