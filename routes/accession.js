
const express = require("express");
const router = express.Router();

const Counter = require("../models/Counter");
const generateAccession = require("../utils/generateAccession");
const QuestionPaper = require("../models/QuestionPaper");
const ResearchPaper = require("../models/ResearchPaper");

/* ===========================
   CREATE QUESTION PAPER
   (Accession generated on SAVE)
=========================== */
router.post("/question-papers", async (req, res) => {
  try {
    const accessionNumber = await generateAccession("question-papers");

    const doc = await QuestionPaper.create({
      ...req.body,
      accessionNumber,
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error("❌ Question Paper upload failed:", err);
    return res.status(500).json({ error: err.message });
  }
});

/* ===========================
   CREATE RESEARCH PAPER
   (Accession generated on SAVE)
=========================== */
router.post("/research-papers", async (req, res) => {
  try {
    const accessionNumber = await generateAccession("research-papers");

    const doc = await ResearchPaper.create({
      ...req.body,
      accessionNumber,
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error("❌ Research Paper upload failed:", err);
    return res.status(500).json({ error: err.message });
  }
});

/* ===========================
   PREVIEW ACCESSION (SAFE)
   ❌ DOES NOT increment counter
=========================== */
router.get("/:type/preview-accession", async (req, res) => {
  try {
    const prefixMap = {
      "question-papers": "QP",
      "research-papers": "RP",
    };

    const type = req.params.type;
    const prefix = prefixMap[type];

    if (!prefix) {
      return res.status(400).json({ error: "Invalid resource type" });
    }

    const counter = await Counter.findById(prefix);

    const nextNumber = (counter?.sequence_value || 0) + 1;
    const padded = nextNumber.toString().padStart(3, "0");

    return res.json({
      accessionNumber: `${prefix}${padded}`,
    });
  } catch (err) {
    console.error("❌ Preview accession failed:", err);
    return res.status(500).json({ error: "Failed to preview accession" });
  }
});

module.exports = router;

