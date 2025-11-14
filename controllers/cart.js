const Cart = require("../model/cart");
const add_to_cart = async (req, res) => {
  try {
    const { userId, eventId, ticketCategory, amount } = req.body;

    let cart = await Cart.findOne({ users: userId });

    if (!cart) {
      cart = new Cart({
        users: userId,
        ticket: [{ eventId, ticketCategory, amount }],
      });
    } else {
      const existingTicket = cart.ticket.find(
        (t) =>
          t.eventId.toString() === eventId &&
          t.ticketCategory === ticketCategory
      );

      if (existingTicket) {
        existingTicket.amount += amount;
      } else {
        cart.ticket.push({ eventId, ticketCategory, amount });
      }
    }

    await cart.save();
    res.status(200).json({code:200,
       message: "Added to cart successfully", 
       data:cart });
  } catch (err) {
    res
      .status(400)
      .json({ code :400,
        message: "Error adding to cart", 
        data:null });
  }
};

const view_from_cart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ users: userId })
      .populate("ticket.eventId")
      .populate("users", "name email");

    if (!cart) return res.status(400).json({ code:400,
      message: "Cart not found" });

    res.status(200).json( {code :200,
      message : "tickets found",
      data : cart});
  } catch (err) {
    res.status(400).json({ code :400 ,
      message: "Error viewing cart", 
      data : null });
  }
};
const remove_from_cart = async (req, res) => {
  try {
    const { userId, eventId, ticketCategory } = req.body;

    const cart = await Cart.findOne({ users: userId });
    if (!cart) return res.status(400).json({ code :400,
      message: "Cart not found",
    data :null });

    const ticket = cart.ticket.find(
      t => t.eventId.toString() === eventId && t.ticketCategory === ticketCategory
    );

    if (!ticket) return res.status(400).json({ code :400,
      message: "Ticket not found in cart" 
    ,data:null});

    if (ticket.amount > 1) {
      ticket.amount -= 1;
    } else {
      cart.ticket = cart.ticket.filter(
        t => !(t.eventId.toString() === eventId && t.ticketCategory === ticketCategory)
      );
    }

    await cart.save();
    res.status(200).json({ code :200,
      message: "One ticket removed successfully", data :cart });
  } catch (err) {
    
    res.status(400).json({ code :400,
      message: "Error removing from cart", 
    data:null });
  }
};

const empty_cart = async (req, res) => {
  try {
    const { userId } = req.body; 

    const cart = await Cart.findOne({ users: userId });
    if (!cart) return res.status(400).json({ code :400,
      message: "Cart not found" 
    ,data :null
    });

    cart.ticket = [];
    await cart.save();

    res.status(200).json({ 
      code :200 ,
      message: "Cart emptied successfully", data :cart });
  } catch (err) {
    
    res.status(400).json({ 
      code :400,
      message: "Error emptying cart", 
      data :null });
  }
};


module.exports = { add_to_cart, remove_from_cart, empty_cart, view_from_cart };
