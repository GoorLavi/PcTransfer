export const calculate = () => {
  let x = 1;
  for (var i = 0; i < 500000; i++) {
    x++;
  }
  console.log('x: ', x);
}
