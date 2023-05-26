# Introduction

Purpose of this project was to build an E-commerce front-end using mockup API https://fakeapi.platzi.com/en/rest/introduction

During this project I learned a lot from state management, project structuring and a little bit of unit testing. There is still improvements to be made, especially more unit tests should be implemented, styling is not completely finished and the code could be optimized and cleaned up. However, as a learning process this was an awesome experience.

Test it out: https://resonant-gaufre-b2b6fe.netlify.app/

## Table of contents

- [Technologies](#technologies)
- [Functionalities](#Functionalities)
- [Issues & Missing functionalities](#Issues-&-Missing-functionalities)
- [Project structure](#project-structure)
- [Getting started](#getting-started)

## Technologies

- TypeScript
- Material UI
- React
- React Router DOM
- React Hook Form
- Redux and Redux Toolkit
- Sass

## Functionalities

- User is able to browse, create and add products to their cart
- Cart has dynamic badge to display item amount in cart
- Sorting products by price and category
- Responsive UI
- Admin user has privileges to update and delete products
    - Really nice way for Admin to update and delete products straight from the products page
- Updating product includes file removals and file adding
- User can register and login to the site
- Profile page only visible if user has logged in

## Issues & Missing functionalities

- Unfinished styling in some views/components
    - Create new product Modal 1st on ToDo
- Home page is empty, should add pictures and lorem ipsum
- Not able to upload multiple files at once
- Code optimization and clean up
- Not able to update user details
- Checkout feature not implemented
- No Error logging for user actions on UI
- Form validation missing
- Loading information in UI not implemented
- More unit test should be used

## Project structure
```bash
│     .gitignore
│     package.json
│     readme.md
│     tsconfig.json
│
├───public
│       index.html
│       manifest.json
│       robots.txt
│
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │
    ├───components
    │       Navbar.tsx
    │       ProductCard.tsx
    │
    ├───hooks
    │       useAppDispatch.ts
    │       useAppSelector.ts
    │       useFileUpload.ts
    │
    ├───interfaces
    │       CartItem.ts
    │       Category.ts
    │       LoginData.ts
    │       NewProduct.ts
    │       Product.ts
    │       ProductCardProps.ts
    │       RegisterData.ts
    │       UpdatedProduct.ts
    │       User.ts
    │
    ├───redux
    │   │   store.ts
    │   │
    │   └───reducers
    │           cartReducer.ts
    │           categoryReducer.ts
    │           productsReducer.ts
    │           userReducer.ts
    │
    ├───styles
    │   │   style.scss
    │   │
    │   ├───components
    │   │       _cart.scss
    │   │       _navbar.scss
    │   │       _productcard.scss
    │   │       _products.scss
    │   │       _singleproduct.scss
    │   │
    │   └───variables
    │           _colors.scss
    │           _fonts.scss
    │
    ├───tests
    │   │   mockStore.ts
    │   │
    │   ├───data
    │   │       categoryData.ts
    │   │       productData.ts
    │   │
    │   ├───reducers
    │   │       productsReducer.test.ts
    │   │
    │   └───server
    │           productServer.ts
    │
    └───views
            Cart.tsx
            Home.tsx
            Login.tsx
            Products.tsx
            Profile.tsx
            SingleProduct.tsx
```

## Getting started

1. Use <code>git clone</code> and <code>npm i</code> to install the project.
2. Use<code>npm run start</code> to run in dev mode. Refer to <code>package.json</code> for more scripts to run. 
