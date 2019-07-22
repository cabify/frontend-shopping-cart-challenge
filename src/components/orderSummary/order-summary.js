import React from 'react';
import PropTypes from 'prop-types';
import './order-summary.scss';

const OrderSummary = props => (
  <aside className="summary">
    <h1 className="main">Order Summary</h1>
    <ul className="summary-items wrapper border">
      <li>
        <span className="summary-items-number">{props.scanCount} Items</span>
        <span className="summary-items-price">{props.scanTotal}
          <span className="currency">€</span>
        </span>
      </li>
    </ul>
    <div className="summary-discounts wrapper-half border">
      <h2>Discounts</h2>
      <ul>
        {
          props.discounts.map(discount =>
            (<li><span>{discount.name}</span><span>-{discount.totalDiscount}€</span></li>))
        }
      </ul>
    </div>
    <div className="summary-total wrapper">
      <ul>
        <li>
          <span className="summary-total-cost">Total cost</span>
          <span className="summary-total-price">{props.total}€</span>
        </li>
      </ul>
      <button type="submit">Checkout</button>
    </div>
  </aside>
);

OrderSummary.propTypes = {
  scanCount: PropTypes.number.isRequired,
  scanTotal: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  discounts: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default OrderSummary;
