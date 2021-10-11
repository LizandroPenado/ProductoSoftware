import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Inicio sesión',
    path: '/login',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Repuesto',
    path: '/repuesto',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
];