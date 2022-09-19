const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const inventoryController = require("../controllers/inventory");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, inventoryController.getInventory);

router.post("/createInventory", upload.single("file"), inventoryController.createInventory);

router.put("/likeInventory/:id", inventoryController.likeInventory);

router.delete("/deleteInventory/:id", inventoryController.deleteInventory);

module.exports = router;
