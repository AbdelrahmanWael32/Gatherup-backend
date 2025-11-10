const Event = require("../model/event");

const get_all_events = async (req, res) => {
  const all_events = await Event.find(
    {},
    { __v: 0, createdAt: 0, updatedAt: 0 }
  );
  return res.status(200).json({
    message: "sucess",
    data: all_events,
  });
};

const add_event = async (req, res) => {
  const { title, date, location, ticketCategories } = req.body;

  if (!title || !date || !location || !ticketCategories) {
    return res.status(400).json({
      status: 400,
      message: "all fields requried",
      data: null,
    });
  }

  const db_events = await Event.findOne({ title });
  if (db_events) {
    return res.status(200).json({
      status: 200,
      message: "event already added",
      data: null,
    });
  }

  const newEvent = new Event({
    title,
    date,
    location,
    ticketCategories,
    image: req.body.image || "/default.png",
    description: req.body.description || "Event description",
    time: req.body.time || "Not specified",
  });

  await newEvent.save();

  res.status(201).json({
    status: 201,
    message: "Event added successfully",
    data: newEvent,
  });
};

const get_single_event = async (req, res) => {
  try {
    const { id: req_id } = req.params;

    const event = await Event.findById(req_id, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!event) {
      return res.status(404).json({
        status: 404,
        message: "Event not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Event found",
      data: event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Server error",
      data: null,
    });
  }
};

module.exports = {
  get_all_events,
  get_single_event,
  add_event,
};
