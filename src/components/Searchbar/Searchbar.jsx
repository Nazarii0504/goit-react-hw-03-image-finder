import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
// import { ImSearch } from 'react-icons/im';
import {
  SearchBarInput,
  SearchBarForm,
  SearchBarButton,
  SearchBarheader,
  SearchBarButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (values.searchQuery.trim() === '') {
      return toast.error('Please, enter search query.');
    }
    onSubmit(values);
    resetForm();
  };
  return (
    <SearchBarheader className="searchbar">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        <SearchBarForm>
          <SearchBarButton type="submit"></SearchBarButton>
          <SearchBarInput type="text" name="searchQuery" />
          <SearchBarButtonLabel />
        </SearchBarForm>
      </Formik>
    </SearchBarheader>
  );
};
PropTypes.Searchbar = {
  onSubmit: PropTypes.func.isRequired,
};
