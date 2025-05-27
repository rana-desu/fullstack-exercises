import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        this app is used by clicking buttons.
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(" ")}
    </div>
  )
}

const Button = ({ onClick, btnName }) => {
  return (
    <button onClick={onClick}>
        {btnName}
    </button>
  )
}

const ComplexState = () => {
  // create two states: left and right
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  // const handleLeftClick = () => {
  //   setAll(allClicks.concat("L"));
  //   const updatedLeft = left + 1; // fix async nature
  //   setLeft(updatedLeft);
  //   setTotal(updatedLeft + right);
  // }

  // const handleRightClick = () => {
  //   setAll(allClicks.concat("R"));
  //   const updatedRight = right + 1;
  //   setRight(updatedRight);
  //   setTotal(left + updatedRight);
  // }

  const handleClick = (direction, value) => () => {
    setAll(allClicks.concat(direction));
    
    if (direction === "L") {
      const updatedLeft = left + value;
      setLeft(updatedLeft);
      setTotal(updatedLeft + right);
    }
    else {
      const updatedRight = right + value;
      setRight(updatedRight);
      setTotal(updatedRight + left);
    }
  }

  // initial value of clicks is that object passed to useState
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1
  //   }
    
  //   // changes the state of current clicks object to newClicks object
  //   setClicks(newClicks) 
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right + 1
  //   }

  //   setClicks(newClicks)
  // }

  return (
    <div>
      {left}
      <Button
        onClick={handleClick("L", 1)}
        btnName="left"
      />
      <Button 
        onClick={handleClick("R", 1)}
        btnName="right"
      />
      {right}

      <p>total clicks: {total}</p>
      <History allClicks={allClicks} />
    </div>
  )
}

export default ComplexState;