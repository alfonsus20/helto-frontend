import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-8">
      <div>Logo</div>
      <dl>
        <dd>Konsultasi</dd>
        <dd>Pelajari Tanamanmu</dd>
        <dd>Komunitas</dd>
      </dl>
      <div>
          <button>Masuk</button>
          <button>Daftar</button>
      </div>
    </nav>
  );
};

export default Navbar;
