const cloudinary = require("../middleware/cloudinary");
const { db } = require("../models/inventoryItem");
const InventoryItem = require("../models/inventoryItem");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const inventory = await InventoryItem.find({ user: req.user.id });
      res.render("profile.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const inventory = await InventoryItem.find()
        .sort({ createdAt: "desc" })
        .lean();
      res.render("feed.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getInventoryItem: async (req, res) => {
    try {
      const inventory = await InventoryItem.findById(req.params.id);
      res.render("inventoryItem.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createInventoryItem: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await InventoryItem.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        price: req.body.price,
        likes: 0,
        user: req.user.id,
      });
      console.log("Inventory item has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeInventoryItem: async (req, res) => {
    try {
      await InventoryItem.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/inventory/inventoryItem/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteInventoryItem: async (req, res) => {
    try {
      // Find post by id
      let inventory = await InventoryItem.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(inventory.cloudinaryId);
      // Delete post from db
      await InventoryItem.remove({ _id: req.params.id });
      console.log("Deleted Inventory Item");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  putCart: async (req, res) => {
    try {
      const itemId = req.body.itemId;
      const direction = req.body.direction;
      if (direction === -1) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.user._id, "cart.itemId": itemId },
          { $inc: { "cart.$.quantity": -1 } },
          { returnNewDocument: true,}
        );
        res.send(updatedUser.cart)
        return;
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.itemId": itemId },
        { $inc: { "cart.$.quantity": 1 } },
        {
          returnNewDocument: true,
        }
      );
      res.send(updatedUser.cart)
    } catch (err) {
      res.redirect("/");
    }
  },
};
