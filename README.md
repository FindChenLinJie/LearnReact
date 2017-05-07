#### React

+ **React**专注于MVC架构中的V，即视图，用于构建UI界面 (用于**构建用户界面**的Javascript库) 

  + **面向 组件 开发**


+   **react.min.js** - React 的核心库

+   **react-dom.min.js** - 提供与 DOM 相关的功能

    + **babel.min.js** - Babel 可以将 ES6 代码转为 ES5 代码

    + **命令行构建环境**

      + **create-react-app 命令行构建 React 开发环境**

        ```javascript
        // cnpm install -g create-react-app
        // create-react-app my-app
        // npm start
        ```


+ ReactDOM.render 是 React 的最基本方法，用于**将模板转为 HTML 语言，并插入指定的 DOM 节点**。

  ```javascript
  // 将组件渲染到界面上
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
  );
  ```

  ​

+ **JSX语法( js + xml )**

  + HTML 语言直接写在 JavaScript 语言之中，不加任何引号。

  + **遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析。**

    ```javascript
    var names = ['Alice', 'Emily', 'Kate'];
    ReactDOM.render(
      <div>
      {
        names.map(function (name, index) {
          return <div key={index}>Hello, {name}!</div>
        })
      }
      </div>,
      document.getElementById('example')
    );
    ```

  + JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

    ```javascript
    var arr = [
      <h1>Hello world!</h1>,
      <h2>React is awesome</h2>,
    ];
    ReactDOM.render(
      <div>{arr}</div>,
      document.getElementById('example')
    );
    ```

    ​

+ **组件**

  + React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。**React.createClass方法就用于生成一个组件类** 

    ```javascript
    // 组件类的this.props 对象的属性与组件的属性一一对应

    // 外部传递参数进来并通过this.props获取到参数
    // 而this.state则是从本组件拿取数据
    <script type="text/babel">
      // 组件类 (创建组件)
      var HelloMessage = React.createClass({
        render: function() {
          return <h1>Hello {this.props.name}</h1>;
        }
      });
      // 将创建的组件渲染到页面上
      ReactDOM.render(
        // 组件HelloMessage
        <HelloMessage name="John" />,
        document.getElementById('example')
      );
    </script>

    // 变量 HelloMessage 就是一个组件类
    // 所有组件类都必须有自己的 render 方法，用于输出组件。
    // 组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

    // 组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。
    // 如下代码报错 因为HelloMessage组件包含了两个顶层标签：h1和p。
    var HelloMessage = React.createClass({
      render: function() {
        return <h1>
          Hello {this.props.name}
        </h1><p>
          some text
        </p>;
      }
    });
    ```

  + **组件类的属性：this.props.children**

    + `this.props.children` 属性，它表示组件的所有子节点

      ```javascript
      <script>
      // NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取
      // this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array
      // React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

      var NotesList = React.createClass({
        render: function() {
          return (
            <ol>
            {
              React.Children.map(this.props.children, function (child) {
                return <li>{child}</li>;
              })
            }
            </ol>
          );
        }
      });

      ReactDOM.render(
        <NotesList>
          <span>hello</span>
          <span>world</span>
        </NotesList>,
        document.body
      );
      </script>
      ```

      ​


+   **组件类的属性：PropTypes**

    + 组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。**组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求**

    ```javascript
    var MyTitle = React.createClass({
      propTypes: {
        title: React.PropTypes.string.isRequired,
      },

      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });

    // getDefaultProps 方法可以用来设置组件属性的默认值。
    var MyTitle = React.createClass({
      getDefaultProps : function () {
        return {
          title : 'Hello World'
        };
      },

      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });

    ReactDOM.render(
      <MyTitle />,
      document.body
    );
    ```

+   **虚拟 DOM**

    + 组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做**虚拟 DOM （virtual DOM）**。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 [DOM diff](http://calendar.perfplanet.com/2013/diff/) ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性。

      ```javascript
      var MyComponent = React.createClass({
        handleClick: function() {
          this.refs.myTextInput.focus();
        },
        render: function() {
          return (
            <div>
              <input type="text" ref="myTextInput" />
              <input type="button" value="Focus the text input" onClick={this.handleClick} />
            </div>
          );
        }
      });

      ReactDOM.render(
        <MyComponent />,
        document.getElementById('example')
      );
      // 组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。
      ```

+   **this.state**

    + 组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI。

      ```javascript
      var LikeButton = React.createClass({
        getInitialState: function() {
          return {liked: false};
        },
        handleClick: function(event) {
          this.setState({liked: !this.state.liked});
        },
        render: function() {
          var text = this.state.liked ? 'like' : 'haven\'t liked';
          return (
            <p onClick={this.handleClick}>
              You {text} this. Click to toggle.
            </p>
          );
        }
      });

      ReactDOM.render(
        <LikeButton />,
        document.getElementById('example')
      );
      // 它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。
      ```


    // 表单
    var Input = React.createClass({
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      render: function () {
        var value = this.state.value;
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            <p>{value}</p>
          </div>
        );
      }
    });
    
    ReactDOM.render(<Input/>, document.body);
    // 文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况
    ​```
    
    ​

+ **组件生命周期**

  ```javascript
  // Mounting：已插入真实 DOM
  // Updating：正在被重新渲染
  // Unmounting：已移出真实 DOM
  // React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
  componentWillMount()
  componentDidMount()
  componentWillUpdate(object nextProps, object nextState)
  componentDidUpdate(object prevProps, object prevState)
  componentWillUnmount()
  // 特殊处理函数
  componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
  shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

  var Hello = React.createClass({
    getInitialState: function () {
      return {
        opacity: 1.0
      };
    },

    componentDidMount: function () {
      this.timer = setInterval(function () {
        var opacity = this.state.opacity;
        opacity -= .05;
        if (opacity < 0.1) {
          opacity = 1.0;
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    },

    render: function () {
      return (
        <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
        </div>
      );
    }
  });

  ReactDOM.render(
    <Hello name="world"/>,
    document.body
  );
  ```

  ​

  ​