import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Awards from '../Awards/Awards';
import Gallery from '../Gallery/Gallery';
import Reviews from '../Reviews/Reviews';
import Footer from '../Footer/Footer';

function HomePage() {
    return (
        <>
        <Header />
        <Main/>
        <About />
        <Awards />
        <Gallery />
        <Reviews />
        <Footer />
        </>
    );
}

export default HomePage;