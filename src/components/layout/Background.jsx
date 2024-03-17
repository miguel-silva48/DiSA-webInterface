import React from "react";

const Background = ({ children }) => {
  return (
    <div>
      <img
        src="/Background.png"
        className="w-auto h-full object-cover fixed inset-0 z-0"
        style={{ zIndex: "-1" }}
      />
      {children}
    </div>
  );
};

export default Background;
