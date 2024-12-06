import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHousesById } from '../Api/Api';
import styles from './CardMain.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function CardMain() {
  const { id } = useParams();
  const [houses, setHouses] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const loadHouses = async () => {
      const data = await fetchHousesById(id);
      setHouses(data);
    };

    loadHouses();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [id]);

  if (!houses) return <div className={styles.loading}>Downloads <FontAwesomeIcon icon="fa-solid fa-spinner" /></div>;

  const images = Array.isArray(houses.image) ? houses.image : [houses.image];

  return (
    <div className={styles.housesDetails}>
      <div className={styles.titleH}>
        <h1>Houses &#8470; {id}</h1>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={isSmallScreen ? false : true}
        className={styles.swiperContainer}
        modules={[Navigation]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} className={styles.carouselImage} alt={houses.location} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={styles.titleLocation}>{houses.location}</h1>
      <p className={styles.description}>{houses.description}</p>

      <div className={styles.otherInfo}>
        <span>Price: {houses.price} <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className={styles.icon} /></span>
        <span> <FontAwesomeIcon icon="fa-solid fa-bed" className={styles.icon} /> Bedrooms: {houses.bedrooms}</span>
        <span> <FontAwesomeIcon icon="fa-solid fa-bath" className={styles.icon} /> Bathrooms: {houses.bathrooms}</span>
        <span> <FontAwesomeIcon icon="fa-solid fa-expand" className={styles.icon} /> Size: {houses.size} sq ft</span>
      </div>
    </div>
  );
}

export default CardMain;
