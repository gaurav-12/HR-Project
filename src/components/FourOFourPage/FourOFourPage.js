import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent/FooterComponent';

import fourOFourImg from './../../assets/404.svg'

const FourOFourPage = () => {
  let firstSection = React.createRef();

  const scrollToTop = () => {
    firstSection.current.scrollIntoView();
  }

  return (
    <section className="Home" id="FourOFourSection" ref={firstSection}>
      <nav style={{ background: 'black' }}>
        <h2>TeamQ</h2>
      </nav>

      <div id="mainDiv">
        <img src={fourOFourImg} alt="Oops! Could not find that Page"/>

        <p>Oops! Could not find that Page</p>

        <Link to="/">
          <button>
            <ChevronLeft color="white" style={{ fontSize: "35px" }} />
            <span>Back Home</span>
          </button>
        </Link>
      </div>

      <FooterComponent navigateToHome={scrollToTop} />
    </section>)
};

export default FourOFourPage;
