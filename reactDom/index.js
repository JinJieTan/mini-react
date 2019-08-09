import handleAttrs from './handleAttrs';
import { createComponent, setComponentProps } from '../components/component';
const ReactDom = {};

const render = function(vnode, container) {
  return container.appendChild(_render(vnode));
};

ReactDom.render = render;
export function _render(vnode) {
  console.log('_render');
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean')
    vnode = '';

  if (typeof vnode === 'number') vnode = String(vnode);

  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return textNode;
  }
  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      handleAttrs(dom, key, value);
    });
  }

  vnode.children && vnode.children.forEach(child => render(child, dom)); // 递归渲染子节点

  return dom;
}




export default ReactDom;
