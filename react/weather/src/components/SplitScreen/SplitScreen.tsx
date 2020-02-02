import React from "react";

import './SplitScreen.css';

export interface SplitScreenProps {
  screenOne?: React.ReactNode;
  screenTwo?: React.ReactNode;
};

const SplitScreen = (props: SplitScreenProps)  => {
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

