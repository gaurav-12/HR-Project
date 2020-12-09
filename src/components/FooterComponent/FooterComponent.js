import React from 'react';
import { Email, Facebook, LinkedIn, Twitter } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const FooterComponent = () => (
  <footer>
    <div>
      <h2>TeamQ</h2>
      <p>© 2020 All rights reserved</p>
    </div>

    <div id="socials">
      <ul>
        <li><Twitter /></li>
        <li><Facebook /></li>
        <li><LinkedIn /></li>
        <li><Email /></li>
      </ul>
    </div>

    <div>
      <ul id="links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Build Team</Link></li>
        <li><Link to="/">Analyze Employee</Link></li>
        <li><Link to="/">Join Program</Link></li>
      </ul>
    </div>
  </footer>
);

export default FooterComponent;
