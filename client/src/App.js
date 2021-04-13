import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skins from './components/Skins/Skin';
import Posts from './components/Posts/Posts';
import Users from './components/Users/Users'; 
import Chats from './components/Chat/Chat';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import NewPost from './components/Posts/CreatePost';
import Navbar from './components/Navbar';
import Error404 from './components/error404/Error404';
import Modify from './components/Posts/ModificarPost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {

  return (
  <div className="App">
      <Router>
        <Navbar />
        
        <Switch>
          <Route path="/" exact component={Posts}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/users/perfil" component={Users}/>
          <Route path="/chat" component={Chats}/>
          <Route path="/skins" component={Skins}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/newpost" component={NewPost}/>
          <Route path="/user/post/:id" component={Modify}/>
          <Route component={Error404} />
        </Switch>
      
    </Router>
    </div>
  );
}

export default App;
