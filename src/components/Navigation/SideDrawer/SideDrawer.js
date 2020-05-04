import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
const SideDrawer = props => {
    let showClass = props.showBackDrop ? classes.Open : classes.Close;
    return(
        <>
            <BackDrop clicked={props.closeSideDrawer} show={props.showBackDrop}/>
            <div className={[classes.SideDrawer, showClass].join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
}

export default SideDrawer;