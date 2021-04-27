import * as React from 'react';
import type {Node} from 'react';
import AppNavigation from './routing/AppNavigation';

//global
global.API_URL = 'http://192.168.1.135/proapp';

const App = () => {
  return <AppNavigation />;
};
export default App;
