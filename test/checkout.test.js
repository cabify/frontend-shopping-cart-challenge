const expect = require('chai').expect;
const Checkout = require('./checkout');

const pricingRules = [{
  code: 'CAP',
  name: 'Cabify Cap',
  image: 'http://',
  price: 5,
  currency: '€',
  offer: {
    id: 'twoXone',
    name: 'Cup offer',
  }
}, {
  code: 'TSHIRT',
  name: 'Cabify T-Shirt',
  image: 'http://',
  price: 20,
  currency: '€',
  offer: {
    id: 'bulk',
    name: 'Shirt Offer',
  }
},{
  code: 'MUG',
  name: 'Cafify Coffee Mug',
  image: 'http://',
  price: 7.5,
  currency: '€',
  offer: {
    id: null,
  }
}];

describe('Checkout', function() {
  it('should expose some methods', function() {
    const checkout = new Checkout(pricingRules);
    expect(checkout.scan).to.be.a('function');
    expect(checkout.total).to.be.a('function');
    expect(checkout.getScans).to.be.a('function');
  });

  describe('should test #scan', () => {
    it('should scan two products', () => {
      const checkout = new Checkout(pricingRules);
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_B');
      expect(actual.scanItems).to.deep.equals([{code: 'PRODUCT_A', qty: 1 }, {code: 'PRODUCT_B', qty: 1 }]);
    }); 

    it('should scan three products | two of them are the same', () => {
      const checkout = new Checkout(pricingRules);
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_A').scan('PRODUCT_B');
      expect(actual.scanItems).to.deep.equals([{code: 'PRODUCT_A', qty: 2 }, {code: 'PRODUCT_B', qty: 1 }]);
    });  

    it('should scan three different products', () => {
      const checkout = new Checkout(pricingRules);
      const actual = checkout.scan('PRODUCT_A').scan('PRODUCT_B').scan('PRODUCT_C');
      expect(actual.scanItems).to.deep.equals([{code: 'PRODUCT_A', qty: 1 }, {code: 'PRODUCT_B', qty: 1 }, {code: 'PRODUCT_C', qty: 1 }]);
    });  
  });

  describe('should test #total', () => {
    it('should test bulk offer', () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT');
      expect(checkout.total()).equal(57);  
    });
    it('should test twoXone offer | two items', () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('CAP').scan('CAP');
      expect(checkout.total()).equal(5);  
    });
    it('should test twoXone offer | three items', () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('CAP').scan('CAP').scan('CAP');
      expect(checkout.total()).equal(10);  
    });
    it('should test total', () => {
      const checkout = new Checkout(pricingRules);
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
      const checkout = new Checkout(pricingRules);
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
      const checkout = new Checkout(pricingRules);
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