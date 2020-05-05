import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, Axios) =>{
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                error: null
            }
            // Axios.interceptors.request.use(req =>{
            //     this.setState({
            //         error: null
            //     })
            //     return req;
            // })
            // Axios.interceptors.response.use(res => res, err =>{
            //     this.setState({
            //         error: err
            //     })
            // })
        }
        componentWillMount(){
            this.reqInterceptor = Axios.interceptors.request.use(req =>{
                this.setState({
                    error: null
                })
                return req;
            })
            this.resInterceptor = Axios.interceptors.response.use(res => res, err =>{
                this.setState({
                    error: err
                })
            })
        }
        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
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
                    <WrapperComponent {...this.props}/>
                </>
            )
        }
    }
}

export default withErrorHandler;