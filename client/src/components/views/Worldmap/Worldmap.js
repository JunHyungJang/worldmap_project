import React, {useState} from 'react'
import "./style.css"
import WorldMap from "react-world-map";
import {Button} from 'antd'
function Worldmap() {
  
    const [Selected, onSelected] = useState(null);

    const handleClick = (event) => {
      window.location.href = `/${Selected}`
    }

    return (

        <div >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <WorldMap  selected={Selected} onSelect={onSelected} />
        <div style = {{display: 'flex', justifyContent: 'center'}}>
        <Button onClick = {handleClick} type = 'primary'> 
          Go travel!
        </Button>
        </div>
      
        </div>
  )
}

export default Worldmap
