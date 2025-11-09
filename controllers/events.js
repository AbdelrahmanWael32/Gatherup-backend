const fake_events = [
  {
    id: 1,
    image: "/sport1.png",
    title: "Youth Basketball Championship",
    price: 100,
    date: "December 15, 2025",
    location: "Al Gezira Sports Club – Cairo",
  },
  {
    id: 2,
    image: "/event2.png",
    title: "Outdoor Movie Night",
    price: 75,
    date: "October 3, 2025",
    location: "Zed Park – Sheikh Zayed, Giza",
  },
  {
    id: 3,
    image: "/event4.png",
    title: "Summer Beats Live Concert",
    price: 250,
    date: "August 8, 2025",
    location: "Cairo Festival City Amphitheater – New Cairo",
  },
];
const Event = require("../model/event");

const get_all_events = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "sucess",
    data: fake_events,
  });
};

const add_event = (req, res) => {
  console.log(req);

  res.status(200).json({
    status: 200,
    message: "Event Added",
    data: fake_events,
  });
};

const get_single_event = (req, res) => {
  const { id: req_id } = req.params;
  const data = fake_events.find((e) => {
    const { id } = e;
    return id == req_id && e;
  });

  if (data) {
    res.status(200).json({
      status: 200,
      message: "Event found",
      data: data,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Event doesnt exist",
      data: null,
    });
  }
};

module.exports = {
  get_all_events,
  get_single_event,
  add_event,
};
