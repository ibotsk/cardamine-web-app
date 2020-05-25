import React from 'react';
import {
  Nav, Navbar, NavItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import config from '../../config';

const CNavbar = (props) => (
  <div id="navigation">
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={config.routes.home}>Cardamine</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer exact to={config.routes.home}>
            <NavItem>
              Home
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to={config.routes.checklist}>
            <NavItem>
              Names
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to={config.routes.chromosomes}>
            <NavItem>
              Chromosome and ploidy level data
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default CNavbar;
