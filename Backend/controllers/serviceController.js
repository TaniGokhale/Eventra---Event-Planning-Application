import Service from "../models/Service.js";

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

export const deleteService = async (
  req,
  res
) => {
  try {
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Service Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};