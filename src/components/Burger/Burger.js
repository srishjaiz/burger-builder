import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const Burger = props => {
    const ingredientsArr = Object.keys(props.ingredients);
    let burgerIngredients = ingredientsArr.map((ingredient)=>{
        let eachIngredientArr = [...Array(props.ingredients[ingredient])].map((_, i)=>{
            return <BurgerIngredient key={ingredient + i} type={ingredient}/>
        });
        return eachIngredientArr;
    }).reduce((prevEl, currEl)=>{
        return prevEl.concat(currEl);
    }, []);
    if(burgerIngredients.length === 0){
        burgerIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;