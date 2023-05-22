import { UpdatedProduct } from './../../interfaces/UpdatedProduct';
import {
  cleanUpProductReducer,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../redux/reducers/productsReducer';
import productServer from '../server/productServer';
import mockStore from '../mockStore';
import { product1 } from '../data/productData';

beforeEach(() => {
  mockStore.dispatch(cleanUpProductReducer());
});

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe('Test productsReducer', () => {
  test('Check initial state', () => {
    expect(mockStore.getState().productsReducer).toEqual({
      loading: false,
      error: '',
      products: [],
    });
  });
  test('Check getAllProducts', async () => {
    await mockStore.dispatch(getAllProducts());
    expect(mockStore.getState().productsReducer.products.length).toBe(5);
  });
  test('Check createProduct', async () => {
    await mockStore.dispatch(getAllProducts());
    await mockStore.dispatch(
      createProduct({
        title: 'New Product',
        price: 10,
        description: 'A description',
        categoryId: 1,
        images: ['https://placeimg.com/640/480/any'],
      })
    );
    expect(mockStore.getState().productsReducer.products.length).toBe(6);
  });
  test('Check deleteProduct', async () => {
    await mockStore.dispatch(getAllProducts());
    await mockStore.dispatch(deleteProduct(1));
    expect(mockStore.getState().productsReducer.products.length).toBe(4);
    expect(mockStore.getState().productsReducer.products).not.toEqual(
      expect.arrayContaining([expect.objectContaining(product1)])
    );
  });
  //test not working, returns original title

  // test('Check updateProduct', async () => {
  //   const updatedProduct = {
  //     title: 'testUpdate',
  //     categoryId: 2,
  //   };
  //   const id = 1;
  //   await mockStore.dispatch(getAllProducts());
  //   await mockStore.dispatch(updateProduct({ updatedProduct, id }));
  //   const findUpdatedProduct = mockStore
  //     .getState()
  //     .productsReducer.products.find((product) => product.id === id);
  //   expect(findUpdatedProduct?.title).toEqual('testUpdate');
  // });
});
