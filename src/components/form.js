import react from "react";
import{ useNavigate} from 'react-router-dom';
import React, { useState,useEffect } from "react"

function Form() {
const [num, setNum] = useState("");
let navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(num)
    // alert(`The name you entered was: ${name}`)
    navigate('/recommendation/products',{state:{index: num}})
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Enter number between 0 to 89
          <input
            type="number"
            value={num}
            onChange={(e) => 
            setNum(e.target.value)
            // navigate('/products',{state:{index: e.target.value}})
            }
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
export default Form
