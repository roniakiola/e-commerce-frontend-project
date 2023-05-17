import {
  cleanUpProductReducer,
  getAllProducts,
  getFilteredProducts,
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
      filteredProducts: [],
    });
  });
  test('Check getAllProducts', async () => {
    await mockStore.dispatch(getAllProducts());
    expect(mockStore.getState().productsReducer.products.length).toBe(5);
  });
  // test('Check getFilteredProducts', async () => {
  //   await mockStore.dispatch(getFilteredProducts(1));
  //   expect(mockStore.getState().productsReducer.filteredProducts).toBeFalsy();
  // });
});
