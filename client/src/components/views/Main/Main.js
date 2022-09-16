import "./Main.css";
import WorldMap from "react-world-map";
import React, { useState } from "react";


function Main() {
  
    const [selected, onSelect] = useState(null);

    return (
    <div>
       <h1> Hello World Map!</h1>
        <WorldMap style = {{width: '100%', height: '100%' }} multiple={true} />
    </div>
  )
}

export default Main
