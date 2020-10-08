import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import DashBoard from './dashboard/index.jsx';
import Post from './post/index.jsx';
import PostDetails from './postDetail/index.jsx'
  
const App = ()=> { 
    return ( 
       <Router> 
           <div className="App"> 
                <Switch> 
                    <Route exact path='/' component={DashBoard}></Route>
                    <Route exact path='/post/:UserId' component={Post}></Route>
                    <Route exact path='/postDetails/:postId' component={PostDetails}></Route>  
                </Switch> 
            </div> 
       </Router> 
   ); 
} 
  
export default App; 