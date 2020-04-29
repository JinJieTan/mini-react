const myUseState = (initialState) => {
  console.log(this, 'this');
  let value = initialState || null;
  const setValue = (newValue) => {
    value = newValue;
  };
  return [value, setValue];
};

export default myUseState;
