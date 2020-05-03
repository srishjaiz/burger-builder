import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
            totalPrice: 20,
            purchasing: false
        };
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }
    cancelPurchaseHandler = () =>{
        this.setState({purchasing: false})
    }
    continuePurchaseHandler = () =>{
        alert('Purchase Successful!');
    }
    addIngredientHandler = type => {
        this.setState((prevState, prevProps)=>{
            let oldCount, updatedCount, updatedIngredientState, updatedTotal; 
            oldCount = prevState.ingredients[type];
            updatedCount = oldCount + 1;
            updatedIngredientState = {
                ...prevState.ingredients,
                [type]: updatedCount
            };
            updatedTotal = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients: updatedIngredientState,
                totalPrice: updatedTotal
            };
        });
    }
    removeIngredientHandler = type => {
        this.setState((prevState)=>{
            let oldCount, oldTotal, updatedCount, updatedIngredientState, updatedTotal;
            oldCount = prevState.ingredients[type];
            if(oldCount <= 0){
                return;
            }
            updatedCount = oldCount - 1;
            updatedIngredientState = {
                ...prevState.ingredients,
                [type]: updatedCount
            };
            oldTotal = prevState.totalPrice;
            updatedTotal = oldTotal - INGREDIENT_PRICES[type];
            return {
                ingredients: updatedIngredientState,
                totalPrice: updatedTotal
            };
        });
    }
    render(){
        // console.log('[BurgerBuilder.js] in render...');
        const disabledInfo = {
            ...this.state.ingredients
        };
        let orderButtonDisabled = false, totalCount = 0;
        for(let key in disabledInfo){
            if(disabledInfo.hasOwnProperty(key)){
                totalCount += disabledInfo[key];
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }
        if(totalCount === 0){
            orderButtonDisabled = true;
        }
        return (
            <Aux>
                <Modal 
                show = {this.state.purchasing}
                cancelPurchase = {this.cancelPurchaseHandler}>
                    <OrderSummary 
                    cancelPurchase = {this.cancelPurchaseHandler}
                    continuePurchase = {this.continuePurchaseHandler}
                    totalPrice = {this.state.totalPrice} 
                    ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                purchasing = {this.purchaseHandler}
                orderButtonDisabled = {orderButtonDisabled}
                price = {this.state.totalPrice}
                disabledInfo = {disabledInfo}
                addIngredient = {this.addIngredientHandler} 
                removeIngredient = {this.removeIngredientHandler}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;