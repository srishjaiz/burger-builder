import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        console.log('[BurgerBuilder.js] in constructor');
        this.state = {
            ingredients:{
                salad: 0,
                meat: 0,
                cheese: 0,
                bacon: 0
            }
        }
    }
    render(){
        console.log('[BurgerBuilder.js] in render...');
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls/>
            </Aux>
        );
    }
}
export default BurgerBuilder;