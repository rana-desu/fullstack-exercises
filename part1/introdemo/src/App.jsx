// defining new component which is to be used in the App component,
// this module only returns the App component, though.
// const Hello = ({ name, age }) => {
//   // const { name, age } = props 
//   // destructuring defined above can be taken a step further
//   // and directly be applied to the paramter part of the arrow function.

//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So, you were probably born in {bornYear()}.</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, btnName }) => {
  return (
    <button onClick={onClick}>
        {btnName}
    </button>
  )
}

const App = () => {
  // calls the useState function with 0 as the argument
  // this call adds state to the component, and renders it with 0 as the initialised value
  // destructuring the contents returned by useState

  // counter variable is assigned the initial value of state (here, 0)
  // setCounter is assigned a function which modifies the state

  // when setCounter is called, React re-renders the "component"
  const [ counter, setCounter ] = useState(0)

  // increment, reset, decrement
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  console.log("rendering...", counter)

  return (
    <div>
      <Display counter={counter} />

      <Button 
        onClick={increaseByOne} 
        btnName="plus" 
      />
      <Button 
        onClick={setToZero} 
        btnName="reset" 
      />
      <Button 
        onClick={decreaseByOne} 
        btnName="minus" 
      />
    </div>
  )
}

export default App;

/* .jsx is capablel of handling both: JS and HTML code at once
  however, compilers like babel are used to compile .jsx code into normal javascript code
  the compiled .js file contains the usage of React library to create elements (using DOM-API)

  we can easily embed dynamic content with JS inside curly braces

  since .jsx is like XML, every tag needs to be closed, even singular tags like <br> is <br />

  Objects are not valid as React childs, meaning they cannot be rendered directly by enclosing them in {}.
  Individual things rendered in the braces must be PRIMITIVE values.
 */