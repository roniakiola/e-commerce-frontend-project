import {
  cleanUpProductReducer,
  getAllProducts,
  createProduct,
} from '../../redux/reducers/productsReducer';
import productServer from '../server/productServer';
import mockStore from '../mockStore';

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
});
