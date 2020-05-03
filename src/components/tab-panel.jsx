import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

export default ({ children, value, index, ...other }) => (
  <Paper
    square
      hidden={value !== index}
      {...other}
    >
        {value === index && <Box p={3}>{children}</Box>}
    </Paper>
  )
