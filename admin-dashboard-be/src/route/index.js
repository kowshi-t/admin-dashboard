const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

router.get("/get", async function (req, res) {
  await adminController.get(req, res);
});

module.exports = router;
