import React from 'react';
import { Typography } from 'antd';
import { auto } from 'manate/react';

import type { Store } from './store';

const { Title } = Typography;

const App = (props: { store: Store }) => {
  const render = () => <Title>Check browser console</Title>;
  return auto(render, props);
};

export default App;
