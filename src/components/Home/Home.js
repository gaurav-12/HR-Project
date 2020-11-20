import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from './../../Firebase';
import LoginSignup from '../LoginSignup/LoginSignup';
import Module from './Module';

import teamImg from './../../assets/team.svg';
import effectiveTeamImg from './../../assets/effective_team.svg';
import analyzeImg from './../../assets/analyze.svg';
import trainingImg from './../../assets/training.svg';
import { ArrowUpward, Email, Facebook, LinkedIn, Loop, Twitter } from '@material-ui/icons';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [showHeadLogo, setShowHeadLogo] = useState(false);
  const [user, setUser] = useState('');

  let firstSection = React.createRef();

  const modules = [
    {
      title: "Build Effective Team",
      description: `Have a Project for an important client? Use TeamQ to build an effective team.
      TeamQ uses Neural Network to build the most efficient team for your project.`,
      image: effectiveTeamImg,
      button: "Built it!"
    },
    {
      title: "Analyze Employees' Performance",
      description: `Analyze your invaluable Employees' performance and explore their Strengths.
      Get graphical representation of each of the employee's strengths.`,
      image: analyzeImg,
      button: "Analyze now"
    },
    {
      title: "Join Training Programs",
      description: `Want to build up your employee's Strength and Confidence?
      Join our Training Programs curated just for you, and coached by best in Industry Experts.`,
      image: trainingImg,
      button: "Join Program"
    }
  ]

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  const handleLogout = () => {
    setIsLoading(true);
    firebase.auth().signOut()
    .then(() => {
      setIsLoading(false);
    });
  }

  const showDialog = (hasAccount) => {
    setHasAccount(hasAccount);
    setShowLoginDialog(true);
    document.body.style.overflowY = "hidden";
  }

  const hideDialog = () => {
    setShowLoginDialog(false);
    document.body.style.overflowY = "scroll";
  }

  const getModules = () => {
    return (
      modules.map((m, i) => <Module module={m} showDialog={showDialog} index={i} key={i} />)
    )
  }

  const scrollToTop = () => {
    firstSection.current.scrollIntoView();
  }

  useEffect(() => {
    authListener();

    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 300)
        setShowHeadLogo(true);
      else
        setShowHeadLogo(false);
    });
  });

  return (
    <section className="Home">
      <nav style={{ boxShadow: showHeadLogo ? 'rgba(0, 0, 0, 0.25) 0px 3px 3px' : null }}>
        <h2 style={{ opacity: showHeadLogo ? 1 : 0 }}>TeamQ</h2>
        {
          user ?
            <button onClick={() => handleLogout()}>Logout</button> :
            <div>
              <button onClick={() => showDialog(true)}>Sign In</button>
              <button onClick={() => showDialog(false)}>Sign Up</button>
            </div>
        }
      </nav>

      {/* First Section */}
      <section className="sections" ref={firstSection}>
        <div>
          <h2>TeamQ</h2>
          <p>
            Build the most effective team for your Project.
            Analyze your Employees' Performance.
            Subscribe to Training Programs.
          </p>

          <button onClick={() => showDialog(false)}>
            Get Started
          </button>
        </div>

        <div>
          <img src={teamImg} />
        </div>
      </section>

      {/* Modules Section */}
      {getModules()}

      {/* Back to top FAB */}
      <button id="upFloatButton" style={{ display: showHeadLogo ? 'block' : 'none' }}
        onClick={() => scrollToTop()}>
        <ArrowUpward fontSize="large" />
      </button>

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
            <li onClick={() => scrollToTop()}>Home</li>
            <li>Build Team</li>
            <li>Analyze Employee</li>
            <li>Join Program</li>
          </ul>
        </div>
      </footer>

      <LoginSignup showDialog={showLoginDialog} hideDialog={hideDialog} hasAccount={hasAccount}
        setHasAccount={setHasAccount} setIsLoading={setIsLoading} />

      <div className="loadingOverlay" style={{ display: isLoading ? 'flex' : 'none' }}>
        <Loop style={{ fontSize: "15vh" }} className={isLoading ? "loadingRotation" : null} />
      </div>
    </section>
  )
};

export default Home;
