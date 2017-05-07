import React, { Component } from 'react';
// import React from 'react';

// class MyComponent extends Component 
// var MyComponent = React.createClass
class MyComponent extends Component {
    // getInitialState() {
    //     return {
    //         defaultProps:"初始值"
    //     }
    // }
    constructor(){
        //添加super相当于将React.Componet new出来
        super();
        this.state={
            textVaule:'这是初始值'
        }
    }
    componentWillMount(){
        this.setState({textVaule:'通过setState修改的值'});
    }
    render() {
        return (
            // <div className="App">
            //   <div className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <h2>Welcome to React</h2>
            //   </div>
            //   <p className="App-intro">
            //     To get started, edit <code>src/App.js</code> and save to reload.
            //   </p>
            // </div>
            <div>
                {
                    // <h1>{this.props.defaultProps}</h1>
                }
                <h1>{this.state.textVaule}</h1>
                <h1> Hello world!!! </h1>  <h2> {this.props.title},{this.props.myCom}</h2> 
            </div>
        );
    }
};

export default MyComponent;
