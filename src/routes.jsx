import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import DashBoard from './dashboard/index.jsx';
  
const App = ()=> { 
    return ( 
       <Router> 
           <div className="App"> 
                <Switch> 
                    <Route exact path='/' component={DashBoard}></Route>  
                </Switch> 
            </div> 
       </Router> 
   ); 
} 
  
export default App; 