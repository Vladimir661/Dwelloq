import React, { useState } from 'react';
import styles from './Header.module.css';
import CustomNavbar from '../Navbar/CustomNavbar';
import Title from '../Title/Title';
import { useAuth } from '../Auth/Auth';

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleBurgerToggle = (isOpen) => {
    setIsBurgerOpen(isOpen);
  };

  return (
    <header id="home" className={styles.headerCust}>
      <CustomNavbar 
        onBurgerToggle={handleBurgerToggle} 
        user={user}
        onLogout={logout}
      />
      <Title isBurgerOpen={isBurgerOpen} />
  </header>
  );
};

export default Header;
