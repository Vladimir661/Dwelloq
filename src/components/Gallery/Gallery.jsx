import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import styles from './Gallery.module.css'

function Gallery() {
    const [isVisible, setIsVisible] = useState(false);
    const titleRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        { threshold: 0.5 }
      );
  
      if (titleRef.current) {
        observer.observe(titleRef.current);
      }
  
      return () => {
        if (titleRef.current) {
          observer.unobserve(titleRef.current);
        }
      };
    }, []);

    return (
        <div id="gallery" className={styles.gallery}>
                <h1 ref={titleRef} className={`${styles.title} ${isVisible ? styles.textFocusIn : styles.textBlurOut}`}>
                    Houses Styles Gallery
                </h1>
                <div className={styles.slider}>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    modules={[Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1200: {
                          slidesPerView: 3,
                        },
                      }}
                >
                    <SwiperSlide>
                        <img src="/gallery/1.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/2.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/3.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/4.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/5.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/6.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/7.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/8.jpg" alt="house" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/gallery/9.jpg" alt="house" />
                    </SwiperSlide>
                </Swiper>
                </div>
        </div>
    );
}

export default Gallery;