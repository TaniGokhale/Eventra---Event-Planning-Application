import React from "react";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="overlay">
          <h1>Plan Your Dream Event With EVENTRA</h1>

          <p>
            Weddings, Birthdays, Corporate Events and More
          </p>

          <button>Explore Events</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;