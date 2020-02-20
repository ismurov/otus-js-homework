import React from 'react';
import './Error.css';

export interface ErrorProps {
  title?: string;
  msg?: string;
};

const Error = ({ title, msg }: ErrorProps) => {
  return (
    <div className="Error">
      <div>
        { title && <h3 className="Error__title">{ title }</h3> }
        { msg && <h5 className="Error__message">{ msg }</h5> }
      </div>
    </div>
  );
}

export default Error;