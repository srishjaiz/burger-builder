import React from 'react';
import classes from './BuildControl.module.css';
const BurgerControl = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button disabled={props.disabled} onClick={props.removed} className={classes.Less}>LESS</button>
        <button onClick={props.added} className={classes.More}>MORE</button>
    </div>
);

export default BurgerControl;