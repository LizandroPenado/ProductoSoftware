import React from "react";

function EncabezadoChat({ nombreCanal }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash"></span>
          {nombreCanal}
        </h3>
      </div>
      <div className="chatHeader__right">Chat</div>
    </div>
  );
}

export default EncabezadoChat;
