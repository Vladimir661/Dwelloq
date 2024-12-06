import React from 'react';
import CustomNavbar from '../Navbar/CustomNavbar';
import Footer from '../Footer/Footer';
import CardMain from '../CardMain/CardMain'

function CardPage() {
    const handleBurgerToggle = () => {};
    return (
        <>
            <CustomNavbar onBurgerToggle={handleBurgerToggle} />
            <CardMain />
            <Footer />
        </>
    );
}

export default CardPage;
