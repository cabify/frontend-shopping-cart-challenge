const Discount = require('./discount');
  
class Checkout {
	constructor(pricingRules = []) {
    this.pricingRules = pricingRules;
    this.scanItems = [];
    this.offers = [];

    this.scan = this.scan.bind(this);
    this.remove = this.remove.bind(this);
    this.total = this.total.bind(this);
    this.getScans = this.getScans.bind(this);
    this.scanCount = this.scanCount.bind(this);
    this.scanTotal = this.scanTotal.bind(this);
	}
  scan(aCode) {
    const index = this.scanItems.findIndex(scanItem => scanItem.code === aCode);
    const exists = index > -1;
    if (exists) this.scanItems[index].qty++;
    if (!exists) this.scanItems = [...this.scanItems, { code: aCode, qty: 1 }];
    return this;
  }
  remove(aCode) {
    const index = this.scanItems.findIndex(scanItem => scanItem.code === aCode);
    const exists = index > -1;
    if (exists && !!this.scanItems[index].qty) this.scanItems[index].qty--;
    return this;
  }
  total() {
    return this.calculate().price;
  }
  calculate() {
    this.price = this.scanItems.reduce((aux, scanItem) => {
      const pricingRule = this.pricingRules.find(pr => pr.code === scanItem.code);
      const discount = pricingRule.offer ? new Discount(pricingRule.offer) : null;
      if (discount) this.addOffer(discount); 
      const total = (pricingRule.price * scanItem.qty);
      const discountAmount = discount ? discount.calculate(scanItem.qty, pricingRule.price).total() : 0;
      return aux + (total - discountAmount);
    }, 0);
    return this;
  }
  addOffer(newOffer) {
    const index = this.offers.findIndex(offer => offer.discountId === newOffer.discountId);
    const exists = index > -1;
    if (exists) this.offers[index] = newOffer;
    if (!exists) this.offers.push(newOffer);
  }
  getScans() {
    return this.scanItems.map(scan => { 
      const price = this.pricingRules.find(pr => pr.code === scan.code).price;
      const total = price * scan.qty;
      return { total, price, ...scan }
    });
  }
  scanCount() {
    return this.getScans().reduce((aux, scanItem) => {
      return aux + scanItem.qty;
    }, 0);
  }
  scanTotal() {
    return this.getScans().reduce((aux, scanItem) => {
      return aux + scanItem.total;
    }, 0);
  }
  getOffers() {
    return this.offers;
  }
}

module.exports = Checkout;
