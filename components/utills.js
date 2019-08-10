import { diffNode } from '../reactDom/diff';

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

export function renderComponent(component, newState = {}) {
  //dom
  console.log('renderComponent');
  let base;
  //返回虚拟dom对象
  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  if (component.base && component.shouldComponentUpdate) {
    let result = true;
    result =
      component.shouldComponentUpdate &&
      component.shouldComponentUpdate(
        (component.props = {}),
        component.newState
      );
    if (!result) {
      return;
    }
  }
  //得到真实dom对象
  base = diffNode(component.base, renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else {
    component.base = base;
    base._component = component;
    component.componentDidMount && component.componentDidMount();
    return;
  }
  component.base = base;
  base._component = component;
}
