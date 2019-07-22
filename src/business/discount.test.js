const expect = require('chai').expect;
const Discount = require('./discount');

describe('Discount', function() {
  it('should calculate a bulk discount', function() {
    const discount = new Discount({ id: 'bulk', name: 'bulk offer' });
    const qty = 3;
    const price = 20;
    expect(discount.calculate(qty, price).total()).equals(3);
  });

  it('should calculate a twoXone discount', function() {
    const discount = new Discount({ id: 'twoForOne', name: '2x1 Cap offer' });
    const qty = 4;
    const price = 10;
    expect(discount.calculate(qty, price).total()).equals(20);
  });
});