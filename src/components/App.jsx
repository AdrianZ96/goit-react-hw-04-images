import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import axios from 'axios';

const API_KEY = '46036625-d1948196a1ed4da366dbae540';
const PER_PAGE = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        );
        setImages(prev => [...prev, ...response.data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
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

  const handleImageClick = img => setSelectedImage(img);

  const handleCloseModal = () => setSelectedImage(null);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onClick={handleImageClick} />
      {loading && <Loader />}
      {images.length >= PER_PAGE && !loading && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};
