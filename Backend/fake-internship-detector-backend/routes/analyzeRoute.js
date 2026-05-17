const express = require("express");
const { analyze, reportScam } = require("../controllers/analyzeController");

const router = express.Router();

router.post("/", analyze);
router.post("/report-scam", reportScam);

module.exports = router;
