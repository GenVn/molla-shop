import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import { Radio, Space } from 'antd';
import Button from '~/components/Button';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeShippingPrice } from '../cartSlice';
import { cartProductsSelector } from '~/redux/selector';
import formatter from '~/config/format';

const cx = classNames.bind(styles);

function CartCheckout(props) {
    const dispatch = useDispatch();
    const allProductsCart = useSelector(cartProductsSelector);
    const radioValue = useSelector((state) => state.cart.shippingPrice);
    const handleChangeRadioValue = (e) => {
        dispatch(changeShippingPrice(e.target.value));
    };

    const handleClickCheckout = () => {};

    const subTotal = useMemo(() => {
        return allProductsCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }, [allProductsCart]);

    const total = useMemo(() => {
        return subTotal + radioValue;
    }, [allProductsCart, radioValue]);

    return (
        <div className={cx('checkout')}>
            <h3 className={cx('checkout__title')}> cart total</h3>
            <div className={cx('subtotal')}>
                <h4>subtotal</h4>
                <span className={cx('subtotal-price')}> {formatter.format(subTotal)}</span>
            </div>

            <div className={cx('shipping')}>
                <h4>shipping</h4>
                <Radio.Group value={radioValue} onChange={handleChangeRadioValue}>
                    <Space direction="vertical" defaultValue={1}>
                        <Radio value={0}>
                            <div className={cx('shipping__item')}>
                                <span>Free Shipping</span>{' '}
                                <span className={cx('shipping__price')}>$0.00</span>
                            </div>
                        </Radio>
                        <Radio value={10}>
                            <div className={cx('shipping__item')}>
                                <span>standard</span>{' '}
                                <span className={cx('shipping__price')}>$10.00</span>
                            </div>
                        </Radio>
                        <Radio value={20}>
                            <div className={cx('shipping__item')}>
                                <span>express</span>{' '}
                                <span className={cx('shipping__price')}>$20.00</span>
                            </div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className={cx('total')}>
                <span>Total:</span>
                <span> {formatter.format(total)}</span>
            </div>

            <Button
                onClick={handleClickCheckout}
                style={{ width: '100%' }}
                type="submit"
                outline
                primary
                rightIcon={<ArrowRightOutlined />}
            >
                Checkout
            </Button>
        </div>
    );
}

CartCheckout.propTypes = {};

export default CartCheckout;
