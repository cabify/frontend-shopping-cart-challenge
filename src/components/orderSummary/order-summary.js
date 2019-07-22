import React from "react";
import PropTypes from "prop-types";
import './order-summary.scss';

const OrderSummary = (props) => {
	return (
    <aside class="summary">
      <h1 class="main">Order Summary</h1>
      <ul class="summary-items wrapper border">
        <li>
          <span class="summary-items-number">{props.scanCount} Items</span
          ><span class="summary-items-price"
            >{props.scanTotal}<span class="currency">€</span></span
          >
        </li>
      </ul>
      <div class="summary-discounts wrapper-half border">
        <h2>Discounts</h2>
        <ul>
          { props.discounts.map((discount) => 
            (<li><span>{discount.name}</span><span>-{discount.totalDiscount}€</span></li>)) }
        </ul>
      </div>
      <div class="summary-total wrapper">
        <ul>
          <li>
            <span class="summary-total-cost">Total cost</span
            ><span class="summary-total-price">{props.total}€</span>
          </li>
        </ul>
        <button type="submit">Checkout</button>
      </div>
    </aside>
	)
}

OrderSummary.propTypes = {
  scanCount: PropTypes.number.isRequired,
  scanTotal: PropTypes.number.isRequired,
  discounts: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default OrderSummary;
