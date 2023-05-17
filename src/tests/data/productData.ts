import { Product } from '../../interfaces/Product';

import {
  category1,
  category2,
  category3,
  category4,
  category5,
} from './categoryData';

const product1: Product = {
  id: 1,
  title: '1st Product',
  price: 1,
  description: 'Shoes',
  category: category1,
  images: [],
};

const product2: Product = {
  id: 2,
  title: '2nd Product',
  price: 2,
  description: 'Shirt',
  category: category2,
  images: [],
};

const product3: Product = {
  id: 3,
  title: '3rd Product',
  price: 3,
  description: 'Shoes',
  category: category3,
  images: [],
};

const product4: Product = {
  id: 4,
  title: '4th Product',
  price: 4,
  description: 'Jeans',
  category: category4,
  images: [],
};

const product5: Product = {
  id: 5,
  title: '5th Product',
  price: 5,
  description: 'Dress',
  category: category5,
  images: [],
};

export { product1, product2, product3, product4, product5 };
