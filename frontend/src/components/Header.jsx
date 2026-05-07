import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import WishlistIcon from './WishlistIcon';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          PetStore
        </Typography>

        <CartIcon />
        <WishlistIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;