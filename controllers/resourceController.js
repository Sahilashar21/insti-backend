
const QuestionPaper = require("../models/QuestionPaper");
const ResearchPaper = require("../models/ResearchPaper");
// const Syllabus = require("../models/syllabus");
// const LabManual = require("../models/LabManual");

/**
 * IMPORTANT:
 * Keys MUST match req.params.type EXACTLY
 */
const modelMap = {
  "question-papers": QuestionPaper,
  "research-papers": ResearchPaper,
  // "syllabus": Syllabus,
  // "lab-manuals": LabManual,
};

/* ===========================
   UPDATE RESOURCE
=========================== */
exports.updateResource = async (req, res) => {
  try {
    const { type, id } = req.params;

    console.log("🔄 UPDATE TYPE RECEIVED:", type);

    const Model = modelMap[type];
    if (!Model) {
      return res.status(400).json({ message: "Invalid resource type" });
    }

    const updated = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ===========================
   DELETE RESOURCE
=========================== */
exports.deleteResource = async (req, res) => {
  try {
    const { type, id } = req.params;

    console.log("🗑 DELETE TYPE RECEIVED:", type);

    const Model = modelMap[type];
    if (!Model) {
      return res.status(400).json({ message: "Invalid resource type" });
    }

    const deleted = await Model.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
