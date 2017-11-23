import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AddItem from "./AddItem";

const Navigation = () => (
  <Router>
    <div>

      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Inventory Manager</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="Link">
            <NavItem >
            <Link to="/"><span className="whiteFont"> Home</span></Link>
            </NavItem>
            <NavItem > 
               <Link to="/about"><span className="whiteFont"> About</span></Link>
            </NavItem>
              <NavItem>
               <Link to="/add"><span className="whiteFont">Add Item</span></Link>
            </NavItem>
              <NavItem>
                <Link to="/topics"><span className="whiteFont">Topics</span></Link>
            </NavItem>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <MenuItem >Action</MenuItem>
              <MenuItem >Another action</MenuItem>
              <MenuItem >Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem >Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
      <Route path="/add" component={AddItem} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default Navigation;
