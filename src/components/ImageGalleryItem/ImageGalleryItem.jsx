import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem} onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" className={css.image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
