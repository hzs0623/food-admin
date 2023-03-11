import React from "react";
import { Select, Input }  from 'antd';

const config = { Select, Input } 

const DynamicComponent = ({ is, useDefaultPath = true, ...rest }) => {

  if (useDefaultPath) {
    return React.createElement(
      require(`../components/${is}.js`).default,
      {
        ...rest,
      }
    );
  }
  const CurrentComp = config[is]

  return <>
    <CurrentComp { ...rest } />
  </>

};

export default DynamicComponent;