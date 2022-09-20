const cloudinary = require("../middleware/cloudinary");
const InventoryItem = require("../models/inventoryItem");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const inventory= await InventoryItem.find({ user: req.user.id });
      res.render("profile.ejs", { inventory: inventory, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const inventory = await InventoryItem.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { inventory: inventory });
    } catch (err) {
      console.log(err);
    }
  },
  getInventoryItem: async (req, res) => {
    try {
      const inventory = await InventoryItem.findById(req.params.id);
      res.render("inventory.ejs", { inventory: inventory, user: req.user });
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
      res.redirect(`/inventoryItem/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteInventory: async (req, res) => {
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
};
