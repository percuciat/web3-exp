import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const Portal = (props) => {
  const { children, tagName } = props;
  const [container] = useState(() => document.createElement(tagName))
  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])
  return ReactDOM.createPortal(children, container);
}

export default Portal;
