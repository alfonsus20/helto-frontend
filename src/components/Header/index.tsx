import React from "react";

type HeaderProps = {
  brownText: string;
  blackText: string;
  className?: string;
};

const Header = ({ brownText, blackText, className = "" }: HeaderProps) => {
  return (
    <h2 className={`text-2xl text-center font-bold ${className}`}>
      <span className="text-brown-700">{brownText}</span> {blackText}
    </h2>
  );
};

export default Header;
