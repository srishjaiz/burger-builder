import React from 'react';
import Button from '../../UI/Button/Button';
// import classes from './OrderSummary.module.css';
const OrderSummary = props => {
    const orderedIngredients = props.ingredients;
        let ingredientsList = [];
        for(let key in orderedIngredients){
            if(orderedIngredients.hasOwnProperty(key)){
                ingredientsList.push(
                <li key={key}>
                    <span style={{textTransform: "capitalize"}}>{key}</span>: {orderedIngredients[key]}
                </li>);
            }
        }
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelPurchase} btnType="Danger">CANCEL</Button>
            <Button clicked={props.continuePurchase} btnType="Success">CONTINUE</Button>
        </>
    );
};

export default OrderSummary;