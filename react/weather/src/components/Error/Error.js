import React from 'react';
import './Error.css';

const Error = ({ title, msg }) => {
  return (
    <div className="Error">
      <div>
        {
          title && <h3 className="Error__title">{ title }</h3>
        }
        {
          msg && <h5 className="Error__message">{ msg }</h5>
        }
      </div>
    </div>
  );
}

export default Error;