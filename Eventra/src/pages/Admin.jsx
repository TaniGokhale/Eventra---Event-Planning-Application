import React, { useState } from "react";
import "../styles/admin.css";

import axios from "axios";

const Admin = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const [admin, setAdmin] = useState(adminInfo);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      localStorage.setItem(
        "adminInfo",
        JSON.stringify(res.data)
      );

      setAdmin(res.data);

      alert("Login Successful");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");

    setAdmin(null);
  };

  return (
    <>
      {!admin ? (
        <div className="login-container">
          <form
            className="login-form"
            onSubmit={handleLogin}
          >
            <h2>EVENTRA ADMIN</h2>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />

            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="dashboard">
          <aside className="sidebar">
            <h2>EVENTRA</h2>

            <ul>
              <li>Dashboard</li>
              <li>Events</li>
              <li>Services</li>
              <li>Vendors</li>
              <li>Bookings</li>
            </ul>

            <button onClick={logoutHandler}>
              Logout
            </button>
          </aside>

          <main className="main-content">
            <h1>Welcome Admin</h1>

            <div className="cards">
              <div className="card">
                <h2>Total Users</h2>
                <p>120</p>
              </div>

              <div className="card">
                <h2>Total Vendors</h2>
                <p>40</p>
              </div>

              <div className="card">
                <h2>Total Bookings</h2>
                <p>75</p>
              </div>

              <div className="card">
                <h2>Total Revenue</h2>
                <p>₹2,50,000</p>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Admin;