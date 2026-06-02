import Service from "../models/Service.js";

// CREATE SERVICE
export const createService = async (req, res) => {
  try {
    const { name, price, image, description } =
      req.body;

    const service = await Service.create({
      name,
      price,
      image,
      description,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL SERVICES
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const { name, price, image, description } =
      req.body;

    const updatedService =
      await Service.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          image,
          description,
        },
        {
          new: true,
        }
      );

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SERVICE
export const deleteService = async (
  req,
  res
) => {
  try {
    const deletedService =
      await Service.findByIdAndDelete(
        req.params.id
      );

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message:
        "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};