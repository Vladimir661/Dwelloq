const API_URL = 'https://6750c07969dc1669ec1c2ed1.mockapi.io/api/v1';

export const fetchHouses = async (filters = {}) => {
  let url = `${API_URL}/houses?page=${filters.page || 1}&limit=6`;
  console.log('Fetching houses with URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      const filteredHouses = data.filter((house) => {

        const isBedMatch =
          filters.bed.length === 0 || filters.bed.some((bed) => bed === house.bedrooms);

        const isBathMatch =
          filters.bath.length === 0 || filters.bath.some((bath) => bath === house.bathrooms);

        const isPriceMatch =
          (!filters.priceRange[0] || house.price >= filters.priceRange[0]) &&
          (!filters.priceRange[1] || house.price <= filters.priceRange[1]);

        return isBedMatch && isBathMatch && isPriceMatch;
      });

      return filteredHouses;
    } else {
      throw new Error('API did not return an array');
    }
  } catch (error) {
    console.error('Error fetching houses:', error);
    return [];
  }
};

export const fetchHousesById = async (id) => {
  const url = `${API_URL}/houses/${id}`;
  console.log('Fetching house by ID URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('House not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching house by ID:', error);
    return null;
  }
};

