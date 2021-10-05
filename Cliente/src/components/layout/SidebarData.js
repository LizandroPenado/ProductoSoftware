import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Cuenta',
    path: '/cuenta',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
];