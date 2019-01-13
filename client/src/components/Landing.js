import React from 'react';
import Emailpic from '../images/emailpic.jpg';

const Landing = () => {
   return (
      <div
         style={{
            textAlign: 'center',
            backgroundImage: `url(${Emailpic})`,
            height: '400px',
            backgroundSize: 'cover'
         }}
      >
         <h1 style={{ paddingTop: '25px' }}>Emaily!</h1>
         Collect Feedback From Your Users!
      </div>
   );
};

export default Landing;
