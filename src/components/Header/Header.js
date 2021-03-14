import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import Logo from '../Logo';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import { authSelectors } from '../../redux/auth';

import s from './Header.module.css';

const Header = ({ isAuthenticated }) => {
  return (
    <header className={s.container}>
      <Logo />

      {isAuthenticated ? (
        <>
          <NavLink
            to={routes.contacts}
            exact
            className={s.link}
            activeClassName={s.link_active}
          >
            Контакты
          </NavLink>
          <UserMenu />
        </>
      ) : (
        <AuthNav />
      )}
    </header>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Header);
