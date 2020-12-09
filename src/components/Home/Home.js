import React, { useState, useEffect } from 'react';
import firebase from './../../Firebase';
import LoginSignup from '../LoginSignup/LoginSignup';
import Module from './Module';

import teamImg from './../../assets/team.svg';
import effectiveTeamImg from './../../assets/effective_team.svg';
import analyzeImg from './../../assets/analyze.svg';
import trainingImg from './../../assets/training.svg';
import { ArrowUpward } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent/FooterComponent';
import LoadingOverlayComp from '../LoadingOverlayComp/LoadingOverlayComp';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showHeadLogo, setShowHeadLogo] = useState(false);
  const [user, setUser] = useState('');
  const [userType, setUserType] = useState(null);

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

  const showDialog = () => {
    if (!user) {
      setShowLoginDialog(true);
      document.body.style.overflowY = "hidden";
    }
  }

  const hideDialog = () => {
    setShowLoginDialog(false);
    document.body.style.overflowY = "scroll";
  }

  const getModules = () => {
    return (
      modules.map((m, i) => <Module module={m} showDialog={showDialog} index={i} key={i} userType={userType} />)
    )
  }

  const scrollToTop = () => {
    firstSection.current.scrollIntoView();
  }

  const getUserType = async (uid = null) => {
    if (user) {
      const userDoc = await firebase.firestore().collection('users').doc(uid ? uid : user.uid).get();
      if (userDoc.exists)
        setUserType(userDoc.get('USER_TYPE'));
    }
  }

  const onScroll = (e) => {
    if (window.scrollY > 300)
      setShowHeadLogo(true);
    else
      setShowHeadLogo(false);
  }

  useEffect(() => {
    authListener();
    window.addEventListener("scroll", onScroll);
    getUserType();

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  });

  return (
    <section className="Home">
      <nav style={{ boxShadow: showHeadLogo ? 'rgba(0, 0, 0, 0.25) 0px 3px 3px' : null }}>
        <h2 style={{ opacity: showHeadLogo ? 1 : 0 }}>TeamQ</h2>
        {
          user ?
            <div>
              <button onClick={() => handleLogout()}>Logout</button>
              <Link to="/employee-form">
                <button>
                  {userType === "HR" ? "Employee Form" : "Edit Form"}
                </button>
              </Link>
            </div> :
            <button onClick={() => showDialog()}>Sign In</button>
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

          <button onClick={() => showDialog()} hidden={user}>
            Get Started
          </button>
        </div>

        <div>
          <img src={teamImg} alt="TeamQ" />
        </div>
      </section>

      {/* Modules Section */}
      {getModules()}

      {/* Back to top FAB */}
      <button className="floatButton" style={{ display: showHeadLogo ? 'block' : 'none' }}
        onClick={() => scrollToTop()}>
        <ArrowUpward fontSize="large" />
      </button>

      <FooterComponent />

      <LoginSignup showDialog={showLoginDialog} hideDialog={hideDialog}
        setIsLoading={setIsLoading} getUserType={getUserType} />

      <LoadingOverlayComp isLoading={isLoading} />
    </section>
  )
};

export default Home;
