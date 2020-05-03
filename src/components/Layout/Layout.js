import React from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
const Layout = props => (
    <Aux>
        <ToolBar/>
        <div>Toolbar, sidebar, backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;