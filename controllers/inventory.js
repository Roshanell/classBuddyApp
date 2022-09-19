const cloudinary = require("../middleware/cloudinary");
const InventoryItem = require("../models/inventoryItem");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const inventory = await Inventory.find({ user: req.user.id });
      res.render("profile.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const inventory = await Inventory.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { inventory: inventory });
    } catch (err) {
      console.log(err);
    }
  },
  getInventory: async (req, res) => {
    try {
      const inventory = await Inventory.findById(req.params.id);
      res.render("inventory.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createInventory: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Inventory.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Inventory item has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeInventory: async (req, res) => {
    try {
      await Inventory.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/inventory/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteInventory: async (req, res) => {
    try {
      // Find post by id
      let inventory = await Inventory.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(inventory.cloudinaryId);
      // Delete post from db
      await Inventory.remove({ _id: req.params.id });
      console.log("Deleted Inventory Item");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
