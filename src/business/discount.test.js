const { describe, it } = require('mocha');
const { expect } = require('chai');
const Discount = require('./discount');

describe('Discount', () => {
  it('should calculate a bulk discount', () => {
    const discount = new Discount({ id: 'bulk', name: 'bulk offer' });
    const qty = 3;
    const price = 20;
    expect(discount.calculate(qty, price).total()).equals(3);
  });

  it('should calculate a twoXone discount', () => {
    const discount = new Discount({ id: 'twoForOne', name: '2x1 Cap offer' });
    const qty = 4;
    const price = 10;
    expect(discount.calculate(qty, price).total()).equals(20);
  });
});
