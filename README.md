# Getting Started with this Products App (Front end)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features of this app

In this porject you can get, create, modify & delete products.

## Setting up local enviroment

To start this app locally first you must have the backend running. You can find it here: [Backend](https://github.com/martinsoengas/back-products-app), then you can just run:

### `npm start`

Runs the app in the development mode. (o)
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
You should see all the products in a grid.

## How to get, create, update or delete a product?

You **get** the products automatically in the root URL '/'.\
To **create** a product you have to press the **'NEW PRODUCT'** button located on the right side of the navbar. Then you must fill the form and press the **'CREATE'** button. A prompt will ask for confirmation.
To **update** a product you have to press the **'EDIT'** button located on the product you want to modify. A modal will open with the last data from the product. You can update any of the information and then press the **'SAVE'** button. a prompt will ask for confirmation.
To **delete** a product you have to press the **'DELETE'** button from the product you want to delete. A prompt will ask for confirmation.

**Other functionality**
You can view the detail of the product by pressing the 'VIEW' button from the product you want to see.

## Libraries used

The app uses Material UI components library.

## How does it work?

To get, create, update & delete a product, this app sends/receives the data it needs from the backend through the API component located in src/api/api.js. At the same time it manages the functions and data with a reducer through a custom hook located in src/hooks/useHttp.js.
