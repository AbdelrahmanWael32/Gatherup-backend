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
  const { title, date, location, ticketCategories, image, eventCategory } =
    req.body;

  if (
    !title ||
    !date ||
    !location ||
    !ticketCategories ||
    !image ||
    !eventCategory
  ) {
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
    eventCategory,
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
    const { id } = req.params;

    const event = await Event.findById(id, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
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

const delete_event = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const update_event = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({
        code: 400,
        message: "Event not found",
        data: null,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (err) {
    console.error("update event error:", err);
    res.status(500).json({
      code: 500,
      message: "Server error",
      data: null,
    });
  }
};

module.exports = {
  get_all_events,
  get_single_event,
  add_event,
  delete_event,
  update_event,
};
