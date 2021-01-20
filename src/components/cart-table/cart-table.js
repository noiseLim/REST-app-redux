import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, plusToCart, minusToCart, clearOrderAfterBuy} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';

const CartTable = ({items, deleteFromCart, RestoService, plusToCart, minusToCart, clearOrderAfterBuy}) => {

    if (items.length === 0) {
        return (<div className="cart__title">Your shopping cart is empty</div>)
    }
    return (
        <>
            <div className="cart__title">Your order:</div>
            <div className="cart__list">

                {
                    items.map(item => {
                        const {title, price, url, id, qtty} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__block">
                                    <div onClick={() => {minusToCart(id)}} className="cart__block-minus">-</div>
                                    <div className="cart__block-qtty">{qtty}</div>
                                    <div onClick={() => {plusToCart(id)}} className="cart__block-plus">+</div>
                                </div>
                                <div className="cart__item-price">{price}$</div>
                                <div onClick={() => {deleteFromCart(id)}} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
                
            </div>
            <button onClick={() => {clearOrderAfterBuy(RestoService.setOrder(generateOrder(items)))}} className="order">Place an order</button>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    plusToCart,
    minusToCart,
    clearOrderAfterBuy
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));