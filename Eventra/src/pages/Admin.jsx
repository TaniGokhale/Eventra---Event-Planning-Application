import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../styles/admin.css";

const Admin = () => {
  const adminInfo = JSON.parse(
    localStorage.getItem("adminInfo")
  );

  const [admin, setAdmin] =
    useState(adminInfo);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [events, setEvents] =
    useState([]);

  const [services, setServices] =
    useState([]);

  const [editingEvent, setEditingEvent] =
    useState(null);

  const [
    editingService,
    setEditingService,
  ] = useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [eventData, setEventData] =
    useState({
      title: "",
      image: "",
      description: "",
    });

  const [serviceData, setServiceData] =
    useState({
      name: "",
      price: "",
      image: "",
      description: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleEventChange = (
    e
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleServiceChange = (
    e
  ) => {
    setServiceData({
      ...serviceData,
      [e.target.name]:
        e.target.value,
    });
  };

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
          "Login Failed"
      );
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem(
      "adminInfo"
    );

    setAdmin(null);
  };

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

  const createEvent = async (
    e
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/events",
        eventData
      );

      fetchEvents();

      setEventData({
        title: "",
        image: "",
        description: "",
      });

      alert("Event Added");
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent =
    async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/events/${editingEvent._id}`,
          eventData
        );

        fetchEvents();

        setEditingEvent(
          null
        );

        setEventData({
          title: "",
          image: "",
          description: "",
        });

        alert(
          "Event Updated"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const deleteEvent =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/events/${id}`
        );

        fetchEvents();
      } catch (error) {
        console.log(error);
      }
    };
      const createService =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "http://localhost:5000/api/services",
          serviceData
        );

        fetchServices();

        setServiceData({
          name: "",
          price: "",
          image: "",
          description: "",
        });

        alert("Service Added");
      } catch (error) {
        console.log(error);
      }
    };

  const updateService =
    async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/services/${editingService._id}`,
          serviceData
        );

        fetchServices();

        setEditingService(
          null
        );

        setServiceData({
          name: "",
          price: "",
          image: "",
          description: "",
        });

        alert(
          "Service Updated"
        );
      } catch (error) {
        console.log(error);
      }
    };

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

  const filteredEvents =
    events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const filteredServices =
    services.filter(
      (service) =>
        service.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  useEffect(() => {
    fetchEvents();
    fetchServices();
  }, []);

  return (
    <div>
      <h1>
        Admin Panel Ready
      </h1>
    </div>
  );
};

export default Admin;