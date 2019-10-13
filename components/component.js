import { _render } from '../reactDom/index';
import { enqueueSetState } from './setState';
export class Component {
  constuctor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(stateChange) {
    // 将修改合并到state
    console.log('setstate');
    const newState = Object.assign(this.state, stateChange);
    console.log('state:', newState);
    this.newState = newState;
    enqueueSetState(newState, this);
  }
}
