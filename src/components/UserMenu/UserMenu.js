import React from 'react';
import { connect } from 'react-redux';
import { authSelectors, logOut } from '../../redux/auth';
import defaultAvatar from '../../images/default-avatar.png';
import Button from '@material-ui/core/Button';
import s from './UserMenu.module.css';

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={s.menu}>
    <img src={avatar} alt="" width="32" className={s.avatar} />
    <span className={s.name}>Добро пожаловать, {name}</span>
    <Button
      type="button"
      variant="contained"
      color="primary"
      onClick={onLogout}
    >
      Выйти
    </Button>
  </div>
);

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
