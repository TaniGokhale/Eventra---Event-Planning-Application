import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    const event = await Event.create({
      title,
      image,
      description,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Event Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};