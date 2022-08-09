import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from '../Services/api';
import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './Container/Container';
import { Modal } from './Modal/Modal';
import { LoaderContainer } from './Loader/Loader.styled';
import { theme } from '../StyleConfig/theme';
export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    items: [],
    isLoading: false,
    showModal: false,
    activeimageURL: null,
  };
  componentDidMount() {
    this.setState({ items: [] });
  }
  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      if (page === 1) {
        this.setState({ items: [] });
      }

      this.fetchGalleryItems();
    }
  }
  fetchGalleryItems = () => {
    const { searchQuery, page } = this.state;

    getImages(searchQuery, page)
      .then(res => {
        this.setState(prevState => ({
          items: [...prevState.items, ...res],
          isLoading: false,
        }));
        if (res.length === 0) {
          return toast.error(
            'Oh, the search results were not successful :( Try again.'
          );
        }
      })
      .catch(error => {
        this.setState({
          status: false,
        });
        toast.error('Sorry, there is ' + error.message);
        this.setState({ isLoading: false });
      });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  setActiveImageURL = activeimageURL => {
    this.setState({ activeimageURL });
  };
  handleSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() !== '') {
      return this.setState({
        searchQuery,
        page: 1,
        isLoading: false,
        items: [],
      });
    }
  };
  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  render() {
    const { showModal, items, activeimageURL, isLoading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} loadMore={this.loadMore} />

        <ToastContainer autoClose={3000} />
        {isLoading && (
          <LoaderContainer>
            <ThreeDots color={theme.colors.searchBarBgc} />
          </LoaderContainer>
        )}

        {items.length !== 0 && (
          <ImageGallery
            items={items}
            toggleModal={this.toggleModal}
            setActiveImageURL={this.setActiveImageURL}
            loadMore={this.loadMore}
          />
        )}
        {showModal && (
          <Modal activeimageURL={activeimageURL} onClose={this.toggleModal} />
        )}
      </Container>
    );
  }
}
