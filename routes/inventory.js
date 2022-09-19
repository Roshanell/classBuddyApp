const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const inventoryController = require("../controllers/inventory");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, inventoryController.getInventoryItem);

router.post("/createInventory", upload.single("file"), inventoryController.createInventoryItem);

router.put("/likeInventoryI/:id", inventoryController.likeInventoryItem);

router.delete("/deleteInventory/:id", inventoryController.deleteInventoryItem);

module.exports = router;
