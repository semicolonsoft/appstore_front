import { Box, Link, Typography } from '@mui/material';

import React from 'react';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Your App. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Created by <Link href="https://myBazar.com">MyBazar</Link>
      </Typography>
    </Box>
  );
}

export default Footer;