import React, { Component } from 'react';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.show !== this.props.show || this.props.children !== nextProps.children){
            return true;
        }
        return false;
    }

    render(){
        return(
            <>
                <BackDrop clicked={this.props.modalClosed} show = {this.props.show}/>
                <div 
                className={classes.Modal}
                style = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;