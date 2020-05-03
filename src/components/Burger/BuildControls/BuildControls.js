import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
]
const BurgerControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
            return (
            <BuildControl 
                disabled = {props.disabledInfo[control.type]}
                added = {() => { props.addIngredient(control.type); }}
                removed = {() => { props.removeIngredient(control.type); }}
                key={control.type} 
                label={control.label}/>
            );
        })}
        <button 
        onClick={props.purchasing} 
        disabled={props.orderButtonDisabled} 
        className={classes.OrderButton}>ORDER NOW</button>
    </div>
);

export default BurgerControls;