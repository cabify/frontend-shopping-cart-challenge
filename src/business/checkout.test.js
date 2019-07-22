const { describe, it } = require('mocha');
const { expect } = require('chai');
const Checkout = require('./checkout');
const products = require('../../data/products');
const discounts = require('../../data/discounts');

const setup = () => {
  const pricingRules = products.map((product) => {
    const offer = discounts.find(discount => discount.code === product.code);
    return { code: product.code, price: product.price.amount, offer };
  });
  return new Checkout(pricingRules);
};

describe('Checkout', () => {
  it('should expose some methods', () => {
    const checkout = setup();
    expect(checkout.scan).to.be.a('function');
    expect(checkout.total).to.be.a('function');
    expect(checkout.getScans).to.be.a('function');
  });

  describe('should test #scan', () => {
    it('should scan two products', () => {
      const checkout = setup();
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_B');
      expect(actual.scanItems).to.deep.equals([{ code: 'PRODUCT_A', qty: 1 }, { code: 'PRODUCT_B', qty: 1 }]);
    });

    it('should scan three products | two of them are the same', () => {
      const checkout = setup();
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_A').scan('PRODUCT_B');
      expect(actual.scanItems).to.deep.equals([{ code: 'PRODUCT_A', qty: 2 }, { code: 'PRODUCT_B', qty: 1 }]);
    });

    it('should scan three different products', () => {
      const checkout = setup();
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_B').scan('PRODUCT_C');
      expect(actual.scanItems).to.deep.equals([{ code: 'PRODUCT_A', qty: 1 }, { code: 'PRODUCT_B', qty: 1 }, { code: 'PRODUCT_C', qty: 1 }]);
    });
  });

  describe('should test #remove', () => {
    it('should scan three TSHIRT and remove one', () => {
      const checkout = setup();
      const actual = checkout.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT').remove('TSHIRT');
      expect(actual.getScans()[0].qty).to.equals(2);
    });
    it('should do nothing when tryng to remove a product that wasnt scan', () => {
      const checkout = setup();
      const actual = checkout.scan('CAP').remove('CAP').remove('CAP').scan('TSHIRT')
        .remove('TSHIRT');
      const expected = [{
        total: 0, price: 5, code: 'CAP', qty: 0,
      },
      {
        total: 0, price: 20, code: 'TSHIRT', qty: 0,
      }];
      expect(actual.getScans()).to.deep.equals(expected);
    });
    it('should scan two CAP and remove one', () => {
      const checkout = setup();
      const actual = checkout.scan('CAP').scan('CAP').scan('TSHIRT').scan('TSHIRT')
        .remove('CAP');

      const expected = [{
        total: 5, price: 5, code: 'CAP', qty: 1,
      },
      {
        total: 40, price: 20, code: 'TSHIRT', qty: 2,
      }];
      expect(actual.getScans()).to.deep.equals(expected);
    });
  });

  describe('should test #total', () => {
    it('should test bulk offer', () => {
      const checkout = setup();
      checkout.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT');
      expect(checkout.total()).equal(57);
    });
    it('should test twoXone offer | two items', () => {
      const checkout = setup();
      checkout.scan('CAP').scan('CAP');
      expect(checkout.total()).equal(5);
    });
    it('should test twoXone offer | three items', () => {
      const checkout = setup();
      checkout.scan('CAP').scan('CAP').scan('CAP');
      expect(checkout.total()).equal(10);
    });
    it('should test total', () => {
      const checkout = setup();
      checkout
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .calculate();


      expect(checkout.total()).equal(97);
    });
    it('should applied two offers', () => {
      const checkout = setup();
      checkout
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .calculate();

      expect(checkout.getOffers().length).equal(2);
      expect(checkout.getOffers().reduce((aux, offer) => offer.totalDiscount + aux, 0)).equal(13);
    });

    it('should test scanItems', () => {
      const checkout = setup();
      checkout
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('CAP')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('TSHIRT')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .scan('MUG')
        .calculate();

      expect(checkout.getScans().length).equal(3);
      expect(checkout.getScans().reduce((aux, scan) => scan.qty + aux, 0)).equal(11);
      expect(checkout.getScans().reduce((aux, scan) => scan.total + aux, 0)).equal(110);
    });
  });
});
