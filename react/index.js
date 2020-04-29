import { Component } from '../components/component';
import useState from './useState';
const React = {};
React.Component = Component;
export const myUseState = useState;
React.createElement = function (tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
};
export default React;
