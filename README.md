# Coffee Station

A small online coffee shop page, built with plain JavaScript (no framework) to practice object-oriented programming.

## Features

- A menu of 16 products in 3 categories: Coffee, Tea and Bread.
- Filter by category. Sort by price, rating or stock.
- Add products to the cart. Change the quantity with + and −, or remove an item.
- The cart never holds more than the stock of a product.
- Bulk discount: the more of one product you buy, the cheaper each one is (see below).
- The cart shows the subtotal, the discount and the total.

## How the discount works

The discount depends on the quantity of **one product** in the cart, not on the total number of items.

| Quantity of one product | Discount |
| ----------------------- | -------- |
| 1 to 5                  | none     |
| 6 to 10                 | 10%      |
| 11 to 15                | 20%      |
| 16 to 20                | 30%      |
| 21 or more              | 40%      |

For each product in the cart:

```
price after discount = price × quantity × (1 − discount)
```

Example: 8 Classic Latte at $4.50.

- Without discount: 8 × $4.50 = $36.00
- 8 is in the 6 to 10 step, so the discount is 10%: $36.00 × 0.9 = $32.40
- The customer saves $3.60.

The cart adds up all products:

- **Subtotal** = the sum of price × quantity, without discount.
- **Total** = the sum of the prices after discount.
- **Discount** = Subtotal − Total.

Totals are rounded to 2 decimals. The rules live in `CartItem.calcDiscount()`, and `Cart` only adds up the results.

## How to run the page

Do not open `index.html` by double-click. The page uses ES modules, and browsers only load them from a web address, not from a file.

1. Install the **Live Server** extension for VS Code.
2. Open the project folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The page opens at `http://127.0.0.1:5500`.

Any other local web server works too.

## Tests and code checks

You need [Node.js](https://nodejs.org) 20.19, 22.13, or 24 and newer. Node 21 and 22.0 to 22.12 do not work with the linter.

```
npm install        # once, to download the tools
npm test           # unit tests
npm run lint       # ESLint
npm run format:check   # Prettier (use `npm run format` to fix)
```

## Folder structure

```
index.html            the page
css/style.css         styles
assets/images/        product pictures
js/main.js            page logic: filter, sort, cart buttons, and putting the HTML in the page
js/buildProductGrid.js, js/buildCartItemsGrid.js   build the HTML
js/validators.js      shared checks for constructors
js/data/product.js    product data
js/models/            the classes
test/                 unit tests
```

## Classes

- `Product` is the parent class. `Coffee`, `Tea` and `Bread` extend it (inheritance).
- `Category` holds all products and does the filtering and sorting.
- `Cart` holds `CartItem` objects (composition) and works out the totals.
- `CartItem` keeps its quantity between 1 and the stock, and works out its own discount.
- Each class keeps its data private with `#` fields and gives access through getters and methods (encapsulation).
