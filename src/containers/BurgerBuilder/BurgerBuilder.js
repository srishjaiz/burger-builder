import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

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
            ingredients: null,
            totalPrice: 20,
            purchasing: false,
            loading: false,
            error: false
        };
    }
    componentDidMount(){
        AxiosInstance.get('/ingredients.json')
        .then(res=>{
            this.setState({
                ingredients: res.data
            })
        })
        .catch(err =>{
            this.setState({error: err});
            this.props.errorHandler(err);
        })
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }
    cancelPurchaseHandler = () =>{
        this.setState({purchasing: false})
    }
    continuePurchaseHandler = () =>{
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer:{
                name: 'Srish',
                address: {
                    street: 'xyz',
                    pincode: '700128',
                    state: 'Kolkata',
                    country: 'India'
                },
                email: 'abcxyz@gmail.com',
                paymentMethod: 'COD'
            }
        }
        AxiosInstance.post('/orders.json', order)
        .then(res=>{
            this.setState({loading: false, purchasing: false})
        })
        .catch(err=>{
            this.setState({loading: false, purchasing: false});
            this.props.errorHandler(err);
        })
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
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        purchasing = {this.purchaseHandler}
                        orderButtonDisabled = {orderButtonDisabled}
                        price = {this.state.totalPrice}
                        disabledInfo = {disabledInfo}
                        addIngredient = {this.addIngredientHandler} 
                        removeIngredient = {this.removeIngredientHandler}/>
                </>
            );
            orderSummary = <OrderSummary 
                cancelPurchase = {this.cancelPurchaseHandler}
                continuePurchase = {this.continuePurchaseHandler}
                totalPrice = {this.state.totalPrice} 
                ingredients = {this.state.ingredients}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal 
                    show = {this.state.purchasing}
                    modalClosed = {this.cancelPurchaseHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, AxiosInstance);