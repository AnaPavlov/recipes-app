import React from 'react';

const scroll = () => {
  const aboutRef = React.createRef();
  const contactRef = React.createRef();

  const scrollToAbout = () => {
    window.scrollTo(0, this.aboutRef.current.offsetTop);
  };

  const scrollToContact = () => {
    window.scrollTo(0, this.contactRef.current.offsetTop);
  };
  return <div></div>;
};

export default scroll;
