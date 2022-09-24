const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const inventoryController = require("../controllers/inventory");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/inventoryItem/:id", ensureAuth, inventoryController.getInventoryItem);

router.post("/createInventory", upload.single("file"), inventoryController.createInventoryItem);

router.put("/likeInventory/:id", inventoryController.likeInventoryItem);

router.delete("/deleteInventoryItem/:id", inventoryController.deleteInventoryItem);

router.put("/cart", inventoryController.putCart)



module.exports = router;
