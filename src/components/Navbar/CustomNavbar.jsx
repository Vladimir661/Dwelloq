import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginModal from '../Login/LoginModal';
import styles from './CustonNavbar.module.css';

const CustomNavbar = ({ onBurgerToggle = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(null);

  const handleToggle = (isOpen) => {
    onBurgerToggle(isOpen);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogin = (user) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <>
      <Navbar expand="lg" className={`${styles.navbar} py-3`}>
        <Container>
          <Navbar.Brand href="#" className={styles.logo}>
            <img src="/logo/Logo-3.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarResponsive"
            className={styles.burger}
            onClick={(e) => handleToggle(e.target.classList.contains("collapsed"))}
          >
            <span className={`${styles.burgerIcon}`}></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarResponsive" className={styles.menu}>
            <Nav className={`ms-auto align-items-center ${styles.navContainer}`}>
              <Nav.Link as={Link} to="/" className={styles.link}>
                Home
              </Nav.Link>
              <Nav.Link href="/#about" className={styles.link}>
                About Us
              </Nav.Link>
              <Nav.Link href="/#gallery" className={styles.link}>
                House Styles Gallery
              </Nav.Link>
              <Nav.Link href="/#clients" className={styles.link}>
                What Clients Say
              </Nav.Link>
              {username ? (
                <div className="d-flex align-items-center">
                  <span className="me-2">{username}</span>
                  <Button variant="outline-light" onClick={handleLogout} className={styles.logoutButton}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" className="icon"/>
                  </Button>
                </div>
              ) : (
                <Button variant="outline-light" onClick={handleShowModal} className={styles.loginButton}>
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={showModal} onClose={handleCloseModal} onLogin={handleLogin} />
    </>
  );
};

export default CustomNavbar;
