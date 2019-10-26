import React from "react";

import './SplitScreen.css';

const SplitScreen = props => {
  const { screenOne, screenTwo } = props;
  return (
    <div className="row">
        <div className="col SplitScreen__container">
          { screenOne }
        </div>
        <div className="col SplitScreen__container">
          { screenTwo }
        </div>
      </div>
  );
};

export default SplitScreen;

