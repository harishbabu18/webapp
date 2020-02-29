import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <button onClick={()=> dispatch(isLogged(true))}>+</button> */}
    </div>
  );
}

export default App;