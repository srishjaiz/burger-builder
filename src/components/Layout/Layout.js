import React from 'react';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
const Layout = props => (
    <Aux>
        <div>Toolbar, sidebar, backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;