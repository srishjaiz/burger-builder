import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, Axios) =>{
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                error: null
            }
        }
        updateErrorStateHandler = (err)=>{
            this.setState({
                error: err
            })
        }
        errorHandledHandler = ()=>{
            this.setState({
                error: null
            })
        }
        render(){
            return (
                <>
                    <Modal 
                    show = {this.state.error}
                    modalClosed = {this.errorHandledHandler}
                    >
                        {this.state.error && this.state.error.message}
                    </Modal>    
                    <WrappedComponent {...this.props} errorHandler = {(err)=>{this.updateErrorStateHandler(err)}}/>
                </>
            )
        }
    }
}

export default withErrorHandler;