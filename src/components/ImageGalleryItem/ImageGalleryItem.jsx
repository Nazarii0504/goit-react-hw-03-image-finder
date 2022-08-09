import {
  ImageGalleryListItem,
  ImageGalleryListItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onClick }) => (
  <ImageGalleryListItem onClick={onClick}>
    <ImageGalleryListItemImage src={item.webformatURL} alt={item.tags} />
  </ImageGalleryListItem>
);
