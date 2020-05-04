import React, { useState } from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
const Layout = props => {
    let [showBackDropState, setShowBackDropState] = useState({
        show: true
    });
    const sideDrawerHandler = () => {
        setShowBackDropState({ show: false});
    }
    const drawerToggle = () => {
        setShowBackDropState(prevState => {
            return { show: !prevState.show}
        });
    }
    return(
        <Aux>
            <ToolBar drawerToggle = {drawerToggle} closeSideDrawer = {sideDrawerHandler} showBackDrop={showBackDropState.show}/>
            <SideDrawer closeSideDrawer = {sideDrawerHandler} showBackDrop={showBackDropState.show}/>
            <div>Toolbar, sidebar, backdrop</div>
            <main 
            className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}
export default Layout;