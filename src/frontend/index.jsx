import React from 'react';
import ForgeReconciler, {  useConfig } from '@forge/react';
import defaultConfig  from './config';
import ConfigureMacro from './configureMacro';
import FinishedPool from './finishedPool';
import ConfigMacro from './configMacro';
import OpenedPool from './openedPool';



const App = () => {
  const config = useConfig() || defaultConfig;
  
  return (
    <>
      {!config.name || !config.endTime || !config.question_0 || !config.question_1 ? (
        <ConfigureMacro />
      ) : (
        new Date(config.endTime) > new Date() ? ( <OpenedPool />) : (<FinishedPool />)
      )}
    </>
  );
};

// Adding the Config function to the ForgeReconciler to allow for configuration changes
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ForgeReconciler.addConfig(<ConfigMacro />);