import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ListIcon from '@mui/icons-material/List';
/* import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'; */
import ChatIcon from '@mui/icons-material/Chat';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StorageIcon from '@mui/icons-material/Storage';

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
    title: 'Establecimiento',
    path: '/establecimiento',
    icon: <CarRepairIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Inventario',
    path: '/inventario',
    icon: <ListIcon />,
    cName: 'nav-text'
  },
  /* {
    title: 'Repuesto',
    path: '/repuesto',
    icon: <LocalGroceryStoreIcon/>,
    cName: 'nav-text'
  }, */
  {
    title: 'Usuario',
    path: '/usuario',
    icon: <PersonIcon/>,
    cName: 'nav-text'
  },  
  {
    title: 'Rol',
    path: '/rol',
    icon: <SupervisorAccountIcon/>,
    cName: 'nav-text'
  },
  /* {
    title: 'Chat',
    path: '/chat',
    icon: <ChatIcon />,
    cName: 'nav-text'
  },   */
  {
    title: 'Base de datos',
    path: '/Conexion',
    icon: <StorageIcon />,
    cName: 'nav-text'
  },  
  {
    title: 'Gestionar chat',
    path: '/gestionChat',
    icon: <ChatIcon />,
    cName: 'nav-text'
  },  

];