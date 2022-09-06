const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, checkDisabled, list } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.get("/check-disabled/:email", checkDisabled)
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

router.get("/listUsers", authCheck, list);


module.exports = router;
