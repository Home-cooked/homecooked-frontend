import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps, Router } from '@reach/router';
import { Grommet } from 'grommet';

// Work around due to known reach router limitation https://github.com/reach/router/issues/141
// const RouterPage = (props: { component: JSX.Element } & RouteComponentProps) => props.component;

render(
  <Grommet plain>
    What's cookin good lookin'
  </Grommet>,
  document.getElementById('root')
);
