import React, { Component } from "react";
import ShoppingCart from "../shoppingCart/shopping-cart";
import OrderSummary from "../orderSummary/order-summary";
import products from '../../../data/products';
import discounts from '../../../data/discounts';
import Checkout from '../../business/checkout';
import './app.scss';

/*
  I'm harcoding products and discounts
  because I think there should be an endpoint
  on backend somewhere to serve them.
  Besides, its not good to have
  business logic on the frontend
*/
class App extends Component {
  constructor() {
    super();
    this.pricingRules = this.formatPricingRules();
    this.co = new Checkout(this.pricingRules);

    this.addScan = this.addScan.bind(this);
    this.removeScan = this.removeScan.bind(this);
    this.formatPricingRules = this.formatPricingRules.bind(this);
    this.extendProducts = this.extendProducts.bind(this);
    this.extendDiscounts = this.extendDiscounts.bind(this);
    this.updateScans = this.updateScans.bind(this);

    this.state = {
      scans: this.co.getScans(),
    };
  }
  extendProducts() {
    return products.map(product => {
      const scan = this.state.scans.find(scan => scan.code === product.code);
      const qty = (scan && scan.qty) || 0;
      const total = (scan && scan.total) || 0;
      return { qty, total, ...product };
    });
  }
  extendDiscounts() {
    return discounts.map(discount => {
      const scan = this.co.calculate().getOffers().find(offer => offer.discountId === discount.id);
      const totalDiscount = (scan && scan.totalDiscount) || 0;
      return { totalDiscount, ...discount };
    });
  }
  formatPricingRules() {
    return products.map(({ code, price }) => {
      const offer = discounts.find(d => d.code === code);
      return { code, offer, price: price.amount };
    });
  }
  updateScans() {
    this.setState({
      scans: this.co.getScans(),
    });
  }
  addScan(code) {
    this.co.scan(code);
    this.updateScans();
  }
  removeScan(code) {
    this.co.remove(code);
    this.updateScans();
  }
  render() {
    return (
      <main class="App">
        <ShoppingCart
          products={this.extendProducts()}
          onAdd={this.addScan}
          onRemove={this.removeScan}
        />
        <OrderSummary
          discounts={this.extendDiscounts()}
          scanCount={this.co.scanCount()}
          scanTotal={this.co.scanTotal()}
          total={this.co.total()}
        />
      </main>
    );
  }
}

export default App;
