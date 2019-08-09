import React from './react/index';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'init'
    };
    this.test=[1,2,3]
  }
  
  handleClick(e){
    this.setState({
        test:'test'
    })
  }
  componentDidMount(){
      console.log('mount')
      this.setState({
        test:'mount'
      })
  }
  componentWillMount(){
    console.log('willMount')
  }
  componentWillUpdate(){
    console.log('willupdate')
  }
  componentDidUpdate(){
    console.log('didupdate')
  }
  render() {
    return <div>
    <span>{this.state.test}</span>
    <button onClick={this.handleClick.bind(this)}>改变状态</button>
    </div>;
  }
}
