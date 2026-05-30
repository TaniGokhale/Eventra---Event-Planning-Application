import React, {
  useEffect,
  useState,
} from "react";

import "../styles/admin.css";

import axios from "axios";

const Admin = () => {
  // =========================
  // LOCAL STORAGE
  // =========================

  const adminInfo = JSON.parse(
    localStorage.getItem("adminInfo")
  );

  // =========================
  // STATES
  // =========================

  const [admin, setAdmin] =
    useState(adminInfo);

  // LOGIN FORM

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // EVENTS

  const [events, setEvents] = useState(
    []
  );

  const [eventData, setEventData] =
    useState({
      title: "",
      image: "",
      description: "",
    });

  // SERVICES

  const [services, setServices] =
    useState([]);

  const [serviceData, setServiceData] =
    useState({
      name: "",
      price: "",
      image: "",
      description: "",
    });

  // =========================
  // LOGIN INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // EVENT INPUT CHANGE
  // =========================

  const handleEventChange = (
    e
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // SERVICE INPUT CHANGE
  // =========================

  const handleServiceChange = (
    e
  ) => {
    setServiceData({
      ...serviceData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // ADMIN LOGIN
  // =========================

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res =
        await axios.post(
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
      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logoutHandler = () => {
    localStorage.removeItem(
      "adminInfo"
    );

    setAdmin(null);
  };

  // =========================
  // FETCH EVENTS
  // =========================

  const fetchEvents = async () => {
    try {
      const res =
        await axios.get(
          "http://localhost:5000/api/events"
        );

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE EVENT
  // =========================

  const createEvent = async (
    e
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/events",
        eventData
      );

      alert("Event Added");

      fetchEvents();

      setEventData({
        title: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE EVENT
  // =========================

  const deleteEvent = async (
    id
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/events/${id}`
      );

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FETCH SERVICES
  // =========================

  const fetchServices =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/services"
          );

        setServices(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // CREATE SERVICE
  // =========================

  const createService =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "http://localhost:5000/api/services",
          serviceData
        );

        alert("Service Added");

        fetchServices();

        setServiceData({
          name: "",
          price: "",
          image: "",
          description: "",
        });
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // DELETE SERVICE
  // =========================

  const deleteService =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/services/${id}`
        );

        fetchServices();
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {
    fetchEvents();

    fetchServices();
  }, []);

  return (
    <>
      {!admin ? (
        // =========================
        // LOGIN PAGE
        // =========================

        <div className="login-container">
          <form
            className="login-form"
            onSubmit={
              handleLogin
            }
          >
            <h2>
              EVENTRA ADMIN
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />

            <button type="submit">
              Login
            </button>
          </form>
        </div>
      ) : (
        // =========================
        // DASHBOARD
        // =========================

        <div className="dashboard">
          {/* SIDEBAR */}

          <aside className="sidebar">
            <h2>EVENTRA</h2>

            <ul>
              <li>
                Dashboard
              </li>

              <li>
                Events
              </li>

              <li>
                Services
              </li>

              <li>
                Vendors
              </li>

              <li>
                Bookings
              </li>
            </ul>

            <button
              onClick={
                logoutHandler
              }
            >
              Logout
            </button>
          </aside>

          {/* MAIN CONTENT */}

          <main className="main-content">
            <h1>
              Welcome,{" "}
              {admin?.name}
            </h1>

            {/* DASHBOARD CARDS */}

            <div className="cards">
              <div className="card">
                <h2>
                  Total Users
                </h2>

                <p>120</p>
              </div>

              <div className="card">
                <h2>
                  Total Vendors
                </h2>

                <p>40</p>
              </div>

              <div className="card">
                <h2>
                  Total Bookings
                </h2>

                <p>75</p>
              </div>

              <div className="card">
                <h2>
                  Total Revenue
                </h2>

                <p>
                  ₹2,50,000
                </p>
              </div>
            </div>

            {/* EVENT FORM */}

            <div className="event-form-container">
              <form
                onSubmit={
                  createEvent
                }
                className="event-form"
              >
                <h2>
                  Add Event
                </h2>

                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={
                    eventData.title
                  }
                  onChange={
                    handleEventChange
                  }
                />

                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={
                    eventData.image
                  }
                  onChange={
                    handleEventChange
                  }
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={
                    eventData.description
                  }
                  onChange={
                    handleEventChange
                  }
                ></textarea>

                <button type="submit">
                  Add Event
                </button>
              </form>
            </div>

            {/* EVENT LIST */}

            <div className="event-list">
              {events.map(
                (event) => (
                  <div
                    className="event-card"
                    key={
                      event._id
                    }
                  >
                    <img
                      src={
                        event.image
                      }
                      alt=""
                    />

                    <h3>
                      {
                        event.title
                      }
                    </h3>

                    <p>
                      {
                        event.description
                      }
                    </p>

                    <button
                      onClick={() =>
                        deleteEvent(
                          event._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>

            {/* SERVICE FORM */}

            <div className="service-form-container">
              <form
                onSubmit={
                  createService
                }
                className="service-form"
              >
                <h2>
                  Add Service
                </h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Service Name"
                  value={
                    serviceData.name
                  }
                  onChange={
                    handleServiceChange
                  }
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={
                    serviceData.price
                  }
                  onChange={
                    handleServiceChange
                  }
                />

                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={
                    serviceData.image
                  }
                  onChange={
                    handleServiceChange
                  }
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={
                    serviceData.description
                  }
                  onChange={
                    handleServiceChange
                  }
                ></textarea>

                <button type="submit">
                  Add Service
                </button>
              </form>
            </div>

            {/* SERVICE LIST */}

            <div className="service-list">
              {services.map(
                (service) => (
                  <div
                    className="service-card"
                    key={
                      service._id
                    }
                  >
                    <img
                      src={
                        service.image
                      }
                      alt=""
                    />

                    <h3>
                      {
                        service.name
                      }
                    </h3>

                    <p>
                      {
                        service.description
                      }
                    </p>

                    <h4>
                      ₹
                      {
                        service.price
                      }
                    </h4>

                    <button
                      onClick={() =>
                        deleteService(
                          service._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Admin;