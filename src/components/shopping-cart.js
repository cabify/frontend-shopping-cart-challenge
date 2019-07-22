import React, { Component } from "react";
import PropTypes from "prop-types";

const ShoppingCart = (props) => {
  const handleOnSubmit = (fn) => { 
    return (event) => {
      event.preventDefault();
      fn();
    }
  }
  
  const renderProduct = (product) => {
    return (<li class="product row">
      <div class="col-product">
        <figure class="product-image">
          <img src={product.picture} alt={product.title}/>
          <div class="product-description">
            <h1>{product.title}</h1>
            <p class="product-code">Product code {product.sku}</p>
          </div>
        </figure>
      </div>
      <div class="col-quantity">
        <button class="count" onClick={handleOnSubmit(() => props.onRemove(product.code))}>-</button>
        <input type="text" class="product-quantity" value={product.qty} />
        <button class="count" onClick={handleOnSubmit(() => props.onAdd(product.code))}>+</button>
      </div>
      <div class="col-price">
        <span class="product-price">{product.price.amount}</span
        ><span class="product-currency currency">{product.price.currency}</span>
      </div>
      <div class="col-total">
        <span class="product-price">{product.total}</span
        ><span class="product-currency currency">{product.price.currency}</span>
      </div>
    </li>)
  }

	return (
		<section class="products">
      <h1 class="main">Shopping cart</h1>
      <ul class="products-list tableHead">
        <li class="products-list-title row">
          <div class="col-product">Product details</div>
          <div class="col-quantity">Quantity</div>
          <div class="col-price">Price</div>
          <div class="col-total">Total</div>
        </li>
      </ul>
      <ul class="products-list">
        { props.products.map(renderProduct) }
      </ul>
    </section>
	)
}

ShoppingCart.propTypes = {
  products: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ShoppingCart;
