import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES={
    salad: 10,
    meat: 50,
    cheese: 20,
    bacon: 50
};
class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        // console.log('[BurgerBuilder.js] in constructor');
        this.state = {
            ingredients: {
                salad: 0,
                meat: 0,
                cheese: 0,
                bacon: 0
            },
            totalPrice: 20
        };
    }
    addIngredientHandler = type => {
        let oldCount, updatedCount, updatedIngredientState, updatedTotal; 
        oldCount = this.state.ingredients[type];
        updatedCount = oldCount + 1;
        updatedIngredientState = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        updatedTotal = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredientState,
            totalPrice: updatedTotal
        });
    }
    removeIngredientHandler = type => {
        let oldCount, oldTotal, updatedCount, updatedIngredientState, updatedTotal;
        oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        updatedCount = oldCount - 1;
        updatedIngredientState = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        oldTotal = this.state.totalPrice;
        updatedTotal = oldTotal - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredientState,
            totalPrice: updatedTotal
        });
    }
    render(){
        // console.log('[BurgerBuilder.js] in render...');
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            if(disabledInfo.hasOwnProperty(key)){
                disabledInfo[key] = disabledInfo[key] <= 0
            }
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls  
                price = {this.state.totalPrice}
                disabledInfo = {disabledInfo}
                addIngredient = {this.addIngredientHandler} 
                removeIngredient = {this.removeIngredientHandler}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;