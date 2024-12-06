import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { fetchHouses } from '../Api/Api'; 
import ViewMoreBtn from '../ViewMoreBtn/ViewMoreBtn';
import Filters from '../Filters/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Card() {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    bed: [],
    bath: [],
    priceRange: [null, null]
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadHouses = async () => {
      setLoading(true);
      const data = await fetchHouses(filters);
      
      if (data && Array.isArray(data) && data.length === 0) {
        setHasMore(false);
      } else {
        setHouses((prevHouses) =>
          filters.page > 1 ? [...prevHouses, ...data] : data
        );
      }

      setLoading(false);
    };

    loadHouses();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
    setHouses([]);
    setHasMore(true);
  };

  const handleViewMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <div className={styles.cards}>
        {Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house) => (
            <div className={styles.productCard} key={house.id}>
              <div className={styles.cardImg}>
                <img src={house.image[0]} alt="bg" />
              </div>
              <div className={styles.cardInformation}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardLocation}>
                    <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" /> {house.location}
                  </div>
                  <div className={styles.cardButton}>
                    <Link to={`/card/${house.id}`} className={styles.viewBtnLink}>
                      <button className={styles.viewBtn}>
                        {house.price} <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className={styles.otherInformation}>
                  <div className={styles.bedInfo}> <FontAwesomeIcon icon="fa-solid fa-bed" /> {house.bedrooms} Bedrooms</div>
                  <div className={styles.bathInfo}> <FontAwesomeIcon icon="fa-solid fa-bath" /> {house.bathrooms} Bath </div>
                  <div className={styles.sizeInfo}> <FontAwesomeIcon icon="fa-solid fa-expand" /> {house.size} sq ft </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No houses available.</p>
        )}
      </div>
      {hasMore && !loading && (
        <ViewMoreBtn onClick={handleViewMore} />
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Card;
