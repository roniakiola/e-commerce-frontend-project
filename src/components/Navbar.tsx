import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justfifyContent: 'space-between',
});

const Navbar = () => {
  return (
    <AppBar position='fixed' color='inherit'>
      <StyledToolbar>
        <Typography variant='h6'>Test</Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
