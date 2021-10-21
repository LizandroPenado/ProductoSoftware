import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';

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
    icon: <BuildIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Usuario',
    path: '/usuario',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
];