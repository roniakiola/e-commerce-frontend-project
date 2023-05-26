import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteForever } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';

import { ProductCardProps } from '../interfaces/ProductCardProps';
import useAppSelector from '../hooks/useAppSelector';
import { UpdatedProduct } from '../interfaces/UpdatedProduct';
import useFileUpload from '../hooks/useFileUpload';
import useAppDispatch from '../hooks/useAppDispatch';
import { removeImage } from '../redux/reducers/productsReducer';

const ProductCard = (props: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { product, handleDelete, handleUpdate, handleAddToCart } = props;
  const { id, title, price, description, images } = product;
  const { user } = useAppSelector((state) => state.userReducer);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { fileLocation, handleFileChange } = useFileUpload();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const onSubmit = (data: UpdatedProduct) => {
    data.images = images;
    data.images = [...data.images, fileLocation];
    handleUpdate(data, id);
    closeForm();
  };

  const handleImageRemove = (imageIndex: number) => {
    dispatch(removeImage({ productId: id, imageIndex }));
  };

  return (
    <>
      <div className='product-card'>
        <div className='product-card__container'>
          {user?.role === 'admin' && (
            <div className='product-card__admin-panel'>
              <DeleteForever
                onClick={() => handleDelete(id)}
                className='delete-icon'
              />
              <EditIcon onClick={openForm} className='edit-icon' />
            </div>
          )}
          {isFormOpen ? (
            <form
              className='product-card__form'
              onSubmit={handleSubmit(onSubmit)}
            >
              {' '}
              <label>Title</label>
              <input
                type='text'
                placeholder='Title'
                defaultValue={title}
                {...register('title')}
              />
              <label>Price</label>
              <input
                type='number'
                placeholder='Price'
                defaultValue={price}
                {...register('price')}
              />
              <label>Description</label>
              <textarea
                placeholder='Description'
                defaultValue={description}
                {...register('description')}
              />
              <label>Upload file</label>
              <input
                type='file'
                multiple
                {...register('images')}
                onChange={(e) => handleFileChange(e.target.files![0])}
              />
              <ul className='image-list'>
                {images.map((image, index) => (
                  <div key={index} className='image-list__item'>
                    <p>{image}</p>
                    <DeleteForever
                      className='delete-icon'
                      onClick={() => handleImageRemove(index)}
                    />
                  </div>
                ))}
              </ul>
              <button type='submit'>Save</button>
              <button type='button' onClick={closeForm}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <Link to={String(id)}>
                <div className='product-card__top'>
                  <div className='product-card__image-container'>
                    <img
                      className='product-card__image'
                      src={images[0]}
                      alt='product'
                    />
                  </div>
                </div>
                <div className='product-card__middle'>
                  <h3 className='product-card__title'>{title}</h3>
                  <p className='product-card__description'>"{description}"</p>
                </div>
              </Link>
              <div className='product-card__bottom'>
                <p className='product-card__price'>{price} €</p>
                <button
                  onClick={() => handleAddToCart({ product, amount: 1 })}
                  className='button--add-to-cart'
                >
                  Add to cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
