import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';
const Logo = props => (
    <div className={classes.Logo}>
        <img alt="Burger Logo" src={burgerLogo}/>
    </div>
    );

export default Logo;