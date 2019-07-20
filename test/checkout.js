const Offer = require('./offer');
  
class Checkout {
	constructor(pricingRules = []) {
    this.pricingRules = pricingRules;
    this.scanItems = [];
    this.offers = [];

    this.scan = this.scan.bind(this);
    this.total = this.total.bind(this);
    this.getScans = this.getScans.bind(this);
	}

  scan(aCode) {
    const index = this.scanItems.findIndex(scanItem => scanItem.code === aCode);
    const exists = index > -1;
    if (exists) this.scanItems[index].qty++;
    if (!exists) this.scanItems = [...this.scanItems, { code: aCode, qty: 1 }];
    return this;
  }

  total() {
    return this.calculate().price;
  }

  calculate() {
    this.price = this.scanItems.reduce((aux, scanItem) => {
      const pricingRule = this.pricingRules.find(pr => pr.code === scanItem.code);
      const offer = new Offer(pricingRule.offer).calculate(scanItem.qty, pricingRule.price);
      this.offers.push(offer);
      const total = (pricingRule.price * scanItem.qty);
      return aux + (total - offer.total());
    }, 0);
    return this;
  }

  getScans() {
    return this.scanItems.map(scan => ({ 
      ...scan,
      total: this.pricingRules.find(pr => pr.code === scan.code).price * scan.qty,
      price: this.pricingRules.find(pr => pr.code === scan.code).price,
    }));
  }

  getOffers() {
    return this.offers.filter(offer => offer.discountId !== null);
  }
}

module.exports = Checkout;
