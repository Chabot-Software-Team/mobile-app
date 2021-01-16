import React from 'react';

function App() {
  
  function hello(){
    console.log("goodbye");
  }
  
  return (
    <>
      <h1>Header</h1>
      <p>Hello World</p>

      <button onClick = {()=>hello()}>click me</button>
    </>

  );
}

export default App;
