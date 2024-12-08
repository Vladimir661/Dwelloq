import React, { useState } from 'react';
import styles from './Filters.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

function Filters({ onFilterChange }) {
  const BEDROOM_OFFSET = 1;
  const BATHROOM_OFFSET = 3;
  const MAX_PRICE = 10000000;

  const [activeButtons, setActiveButtons] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([null, null]);

  const toggleButton = (index) => {
    setActiveButtons((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handlePriceChange = (e, type) => {
    const rawValue = e.target.value;
    const value = rawValue === '' ? null : Number(rawValue);

    if (value !== null && (isNaN(value) || value < 0 || value > MAX_PRICE)) {
      return;
    }

    setPriceRange((prev) => {
      if (type === 'min') return [value, prev[1]];
      if (type === 'max') return [prev[0], value];
      return prev;
    });
  };

  const handleApplyFilters = () => {
    const bedFilters = activeButtons
      .filter(i => i < BATHROOM_OFFSET)
      .map(i => i + BEDROOM_OFFSET);

    const bathFilters = activeButtons
      .filter(i => i >= BATHROOM_OFFSET)
      .map(i => i - (BATHROOM_OFFSET - BEDROOM_OFFSET));

    const updatedFilters = {
      bed: bedFilters,
      bath: bathFilters,
      priceRange,
    };

    onFilterChange(updatedFilters);
  };

  const buttons = [
    { label: '1 Bed Room', className: styles.bedBtn },
    { label: '2 Bed Room', className: styles.bedBtn },
    { label: '3 Bed Room', className: styles.bedBtn },
    { label: '1 Bath Room', className: styles.bathBtn },
    { label: '2 Bath Room', className: styles.bathBtn },
    { label: '3 Bath Room', className: styles.bathBtn },
  ];

  const handleAllFilters = () => {
    setActiveButtons([]);
    setPriceRange([null, null]);
    onFilterChange({ bed: [], bath: [], priceRange: [null, null] });
  };

  const handleFiltersToggle = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainButtons}>
        <button
          className={`${styles.allFiltersBtn} ${activeButtons.length === 0 && !showFilters ? styles.active : ''}`}
          onClick={handleAllFilters} >
          All
        </button>
        <button
          className={`${styles.filtersToggleBtn} ${showFilters ? styles.active : ''}`}
          onClick={handleFiltersToggle}>
          <FontAwesomeIcon icon={faSliders} /> Filters
        </button>
      </div>
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.allCustomBtn}>
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`${button.className} ${activeButtons.includes(index) ? styles.active : ''}`}
                onClick={() => toggleButton(index)}
              >
                {button.label}
              </button>
            ))}
          </div>
          <div className={styles.priceRange}>
            <div>
              <label htmlFor="minPrice">Min Price:</label>
              <input
                type="number"
                id="minPrice"
                value={priceRange[0] || ''}
                onChange={(e) => handlePriceChange(e, 'min')}
                placeholder="Price from 0"
              />
            </div>
            <div>
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                type="number"
                id="maxPrice"
                value={priceRange[1] || ''}
                onChange={(e) => handlePriceChange(e, 'max')}
                placeholder={`Price up to ${MAX_PRICE.toLocaleString()}`}
              />
            </div>
            <button className={styles.applyButton} onClick={handleApplyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
