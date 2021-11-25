import React from "react";
import ChatIcon from '@mui/icons-material/Chat';

function CanalEnSidebar({ nombre, id }) {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannel__hash"> <ChatIcon/> </span>
        {nombre}
      </h4>
    </div>
  );
}

export default CanalEnSidebar;