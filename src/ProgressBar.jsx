import React from "react";
import zxcvbn from 'zxcvbn';

const ProgressBar = () => {

    const prograssBarStyle = () => ({
        background : 'red',
        width :'70%',
        height : '8px'
    })
  return (
    <>
      <div className="progress" style={{height : '8px'}}>
        <div className="progress-bar" style={prograssBarStyle()}></div>
      </div>
    </>
  );
};

export default ProgressBar;
