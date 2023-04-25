import React from 'react';

function Warning(props) {
  const { message, colorType } = props;
  let color = `alert alert-${colorType} d-flex align-items-center`;
  return (
    <div className={color} role='alert'>
      <div>{message}</div>
    </div>
  );
}

export default Warning;
