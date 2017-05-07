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
        // 定义初始值
        //添加super相当于将React.Componet new出来
        super();
        this.state={
            textVaule:'这是初始值',
            number:1
        }
    }
    handleAdd(e){
        console.log(e);
        console.log(this);
        var numbers = this.state.number + 1;
        this.setState({
            number: numbers
        });
    }
    // 已插入真实DOM之前
    componentWillMount(){
        console.log(this.state.textVaule);  // 这是初始值 打印之前的数据
        console.log("已插入真实DOM之前");
        // setState是用于设置state中的参数
        this.setState({textVaule:'通过setState修改的值'});
        console.log(this.state.textVaule);  // 这是初始值 打印之前的数据
    }
    // 已插入真实DOM之后
    componentDidMount(){
        console.log("已插入真实DOM之后");
    }
    // 正在被重新渲染之前
    componentWillUpdate(){
        console.log('//将要更新');
    }
    // 正在被重新渲染之后
    componentDidUpdate(){
        console.log('//已经更新');
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
                <input type="button" value="点击" onClick={this.handleAdd.bind(this)} />
                <p>{this.state.number}</p>
                <h1>{this.state.textVaule}</h1>
                <h1> Hello world!!! </h1>  <h2> {this.props.title},{this.props.myCom}</h2> 
            </div>
        );
    }
};

export default MyComponent;
