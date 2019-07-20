import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <main class="App">
        <section class="products">
          <h1 class="main">Shopping cart</h1>
          <ul class="products-list tableHead">
            <li class="products-list-title row">
              <div class="col-product">Product details</div>
              <div class="col-quantity">Quantity</div>
              <div class="col-price">Price</div>
              <div class="col-total">Total</div>
            </li>
          </ul>
          <ul class="products-list">
            <li class="product row">
              <div class="col-product">
                <figure class="product-image">
                  <img src="img/shirt.png" alt="Shirt" />
                  <div class="product-description">
                    <h1>Shirt</h1>
                    <p class="product-code">Product code X7R2OPX</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="count">-</button
                ><input type="text" class="product-quantity" value="3" /><button
                  class="count"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="product-price">20</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="product-price">60</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
            <li class="product row">
              <div class="col-product">
                <figure class="product-image">
                  <img src="img/mug.png" alt="Mug" />
                  <div class="product-description">
                    <h1>Mug</h1>
                    <p class="product-code">Product code X2G2OPZ</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="count">-</button
                ><input type="text" class="product-quantity" value="4" /><button
                  class="count"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="product-price">5</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="product-price">20</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
            <li class="product row">
              <div class="col-product">
                <figure class="product-image">
                  <img src="img/cap.png" alt="Cap" />
                  <div class="product-description">
                    <h1>Cap</h1>
                    <p class="product-code">Product code X3W2OPY</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="count">-</button
                ><input type="text" class="product-quantity" value="4" /><button
                  class="count"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="product-price">10</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="product-price">40</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
          </ul>
        </section>
        <aside class="summary">
          <h1 class="main">Order Summary</h1>
          <ul class="summary-items wrapper border">
            <li>
              <span class="summary-items-number">11 Items</span
              ><span class="summary-items-price"
                >120<span class="currency">€</span></span
              >
            </li>
          </ul>
          <div class="summary-discounts wrapper-half border">
            <h2>Discounts</h2>
            <ul>
              <li><span>2x1 Mug offer</span><span>-10€</span></li>
              <li><span>x3 Shirt offer</span><span>-3€</span></li>
              <li><span>Promo code</span><span>0€</span></li>
            </ul>
          </div>
          <div class="summary-total wrapper">
            <ul>
              <li>
                <span class="summary-total-cost">Total cost</span
                ><span class="summary-total-price">107€</span>
              </li>
            </ul>
            <button type="submit">Checkout</button>
          </div>
        </aside>
      </main>
    );
  }
}

export default App;