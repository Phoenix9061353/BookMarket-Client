import React from 'react';

function Waiting(props) {
  const { message } = props;
  return (
    <div className='background'>
      <div className='waiting-content'>
        <h3 className='waiting-text'>{message}</h3>
      </div>
    </div>
  );
}

export default Waiting;
