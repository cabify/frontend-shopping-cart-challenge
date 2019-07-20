class Offer {
  constructor({ id, name }) {
    this.discountId = id;
    this.name = name;
    this.totalDiscount = 0;

    this.calculate = this.calculate.bind(this);
    this.total = this.total.bind(this);
  }

  calculate(count, price) {
    const discountId = this.discountId;
    if (discountId === 'bulk') {
      if (count > 1) this.totalDiscount = 1 * count;
    }
      
    if (discountId === 'twoXone') {
      if (count > 1 && count % 2 === 0) this.totalDiscount = (count * price) / 2;
      if (count > 1 && count % 2 === 1) this.totalDiscount = ((count - 1) * price) / 2;
    }

    return this;
  }

  total() {
    return this.totalDiscount;
  }
}

module.exports = Offer;