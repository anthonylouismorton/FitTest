import React from 'react';
import RespiratorCardContainer from './respiratorcardcontainer';
const Respirator = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <a href='/Respirator/Add'>
        <div>New Respirator</div>
      </a>
      <RespiratorCardContainer/>
    </div>
  );
};

export default Respirator;
