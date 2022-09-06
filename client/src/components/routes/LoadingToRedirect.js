import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);

  if(count === 1)
  {
    return (
      <div className="container p-5 text-center">
        <p>Preusmjeravanje za {count} sekundu</p> 
      </div>
    );
  } else {
    return (
      <div className="container p-5 text-center">
        <p>Preusmjeravanje za {count} sekundi</p>
      </div>
    );
  };
};

export default LoadingToRedirect;
