import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { changeFilter, getFilter, getContacts } from '../../redux/contacts';
import s from './Filter.module.css';

const Filter = ({ value, onChange, contacts }) => {
  return (
    <>
      {contacts.length === 0 ? (
        <CSSTransition in={true} timeout={0} unmountOnExit>
          <p>Please, add a new contact</p>
        </CSSTransition>
      ) : (
        <CSSTransition in={true} timeout={250} classNames={s} unmountOnExit>
          <label className={s.filter}>
            <span>Find contacts by name</span>
            <input
              className={s.filter__input}
              type="text"
              value={value}
              onChange={onChange}
            />
          </label>
        </CSSTransition>
      )}
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: getFilter(state),
  contacts: getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
