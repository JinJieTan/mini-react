import { _render } from '../reactDom/index';
export class Component {
  constuctor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(stateChange) {
    // 将修改合并到state
    console.log('setstate');
    const result = Object.assign(this.state, stateChange);
    console.log('state:', result);
    renderComponent(this);
  }
}
export function createComponent(component, props) {
  let inst;
  // 如果是类定义组件，则直接返回实例
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
    // 如果是函数定义组件，则将其扩展为类定义组件
  } else {
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function() {
      return this.constructor(props);
    };
  }

  return inst;
}
export function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}
export function renderComponent(component) {
  console.log('renderComponent');
  let base;

  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else {
    component.base = base;
    component.componentDidMount && component.componentDidMount();
    if (component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild(base, component.base);
    }
    return;
  }
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
}
