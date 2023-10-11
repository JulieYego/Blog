import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogDetails from './pages/BlogDetails'
import WrappedForm from './pages/AddBlog'
import 'antd/dist/antd.css';
import NotFound from './NotFound'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/new">
            <WrappedForm />
          </Route> */}
          <Route path="/new" component={WrappedForm}/>
          {/* <Route path="/blogs/:id">
            <BlogDetails />
          </Route> */}
          <Route path="/blogs/:id" component={BlogDetails}/>
          <Route component={NotFound}/>
        </Switch>
      </div> 
    </div>
  )
}

export default App
