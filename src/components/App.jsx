import { useState, useEffect } from 'react';
import axios from 'axios';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const API_KEY = '46036625-d1948196a1ed4da366dbae540';
const PER_PAGE = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: query,
          page,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: PER_PAGE,
        });

        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        setImages(prev => [...prev, ...response.data.hits]);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Something went wrong while fetching images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const handleImageClick = image => setSelectedImage(image);

  const handleCloseModal = () => setSelectedImage(null);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <ImageGallery images={images} onClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && images.length % PER_PAGE === 0 && !loading && (
        <Button onClick={handleLoadMore} />
      )}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};
