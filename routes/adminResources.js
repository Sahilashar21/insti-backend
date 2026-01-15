const express = require('express');
const router = express.Router();

const QuestionPaper = require('../models/QuestionPaper');
const ResearchPaper = require('../models/ResearchPaper');

// ---------------- Upload Resource ----------------
router.post('/:type', async (req, res) => {
  const { type } = req.params;
  const data = req.body;

  try {
    const { accessionNumber } = data;

    if (!accessionNumber) {
      return res.status(400).json({ error: "Accession number is required" });
    }

    const resourceData = { ...data };
    let resource;

    switch (type) {
      case 'question-papers':
        resource = new QuestionPaper(resourceData);
        break;

      case 'research-papers':
        resource = new ResearchPaper(resourceData);
        break;

      default:
        return res.status(400).json({ error: `Invalid resource type: '${type}'` });
    }

    await resource.save();

    return res.status(201).json({
      message: 'Resource uploaded successfully ✅',
      type,
      accessionNumber,
    });

  } catch (err) {
    console.error("❌ Error uploading resource:", err);
    return res.status(500).json({
      error: 'Internal Server Error while uploading resource',
      details: err.message,
    });
  }
});

// ---------------- Update Resource ----------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Find whether resource is QuestionPaper or ResearchPaper
    let resource =
      (await QuestionPaper.findById(id)) ||
      (await ResearchPaper.findById(id));

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Update fields
    Object.assign(resource, data);
    await resource.save();

    return res.json({
      message: "Resource updated successfully ✅",
      resource,
    });
  } catch (err) {
    console.error("❌ Error updating resource:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// ---------------- Delete Resource ----------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let resource =
      (await QuestionPaper.findByIdAndDelete(id)) ||
      (await ResearchPaper.findByIdAndDelete(id));

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    return res.json({ message: "Resource deleted successfully ✅" });
  } catch (err) {
    console.error("❌ Error deleting resource:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;





// const express = require('express');
// const router = express.Router();

// const QuestionPaper = require('../models/QuestionPaper');
// const ResearchPaper = require('../models/ResearchPaper');

// // // 🔍 Debug log to verify model is imported
// // console.log("🔍 ResearchPaper model loaded:", !!ResearchPaper);

// router.post('/:type', async (req, res) => {
//   const { type } = req.params;
//   const data = req.body;

//   try {
//     // ⚠️ Use accessionNumber sent from frontend — DO NOT regenerate it here
//     const { accessionNumber } = data;

//     if (!accessionNumber) {
//       return res.status(400).json({ error: "Accession number is required" });
//     }

//     // Prepare resource data with frontend-sent accession number
//     const resourceData = { ...data };

//     let resource;

//     switch (type) {
//       case 'question-papers':
//         resource = new QuestionPaper(resourceData);
//         break;

//       case 'research-papers':
//         resource = new ResearchPaper(resourceData);
//         break;

//       default:
//         return res.status(400).json({ error: `Invalid resource type: '${type}'` });
//     }

//     await resource.save();

//     // ✅ Return only key info
//     return res.status(201).json({
//       message: 'Resource uploaded successfully ✅',
//       type,
//       accessionNumber,
//     });

//   } catch (err) {
//     console.error("❌ Error uploading resource:", err);
//     return res.status(500).json({
//       error: 'Internal Server Error while uploading resource',
//       details: err.message,
//     });
//   }
// });

// router.put("/:id", updateResource);
// router.delete("/:id", deleteResource);

// module.exports = router;

// // routes/adminResources.js

// const express = require('express');
// const router = express.Router();
// const generateAccession = require('../utils/generateAccession');

// const QuestionPaper = require('../models/QuestionPaper');
// const ResearchPaper = require('../models/ResearchPaper');

// // 🔍 Debug log to verify model is imported
// console.log("🔍 ResearchPaper model loaded:", !!ResearchPaper);

// router.post('/:type', async (req, res) => {
//   const { type } = req.params;
//   const data = req.body;

//   try {
//     // Generate unique accession number
//     const accessionNumber = await generateAccession(type);

//     // Prepare resource data
//     const resourceData = { ...data, accessionNumber };

//     let resource;

//     switch (type) {
//       case 'question-papers':
//         resource = new QuestionPaper(resourceData);
//         break;

//       case 'research-papers':
//         resource = new ResearchPaper(resourceData);
//         break;

//       // 📚 You can add more resource types like "syllabus" here later

//       default:
//         return res.status(400).json({ error: `Invalid resource type: '${type}'` });
//     }

//     await resource.save();

//     // ✅ Return only key info (accessionNumber, type, message)
//     return res.status(201).json({
//       message: 'Resource uploaded successfully ✅',
//       type,
//       accessionNumber,
//     });

//   } catch (err) {
//     console.error("❌ Error uploading resource:", err);
//     return res.status(500).json({
//       error: 'Internal Server Error while uploading resource',
//       details: err.message,
//     });
//   }
// });

module.exports = router;

//   // routes/adminResources.js

// const express = require('express');
// const router = express.Router();
// const generateAccession = require('../utils/generateAccession');

// const QuestionPaper = require('../models/QuestionPaper');
// const ResearchPaper = require('../models/ResearchPaper');

// // 🔍 Debug log to test if model is imported correctly
// console.log("🔍 ResearchPaper model:", ResearchPaper);
// // Add more models as needed

// router.post('/:type', async (req, res) => {
//   const { type } = req.params;
//   const data = req.body;

//   try {
//     // Generate unique accession number
//     const accessionNumber = await generateAccession(type);

//     // Add accessionNumber to data
//     const resourceData = { ...data, accessionNumber };

//     let resource;

//     switch (type) {
//       case 'question-papers':
//         resource = new QuestionPaper(resourceData);
//         break;
//       case 'research-papers':
//         resource = new ResearchPaper(resourceData);
//         break;
//       // Add other cases for different resources
//       default:
//         return res.status(400).json({ error: 'Invalid resource type' });
//     }

//     await resource.save();

//     return res.status(201).json({ message: 'Resource uploaded successfully', resource });

//   } catch (err) {
//     console.error("Error uploading resource:", err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

  // // backend/routes/adminResources.js
  // const express = require("express");
  // const router = express.Router();
  // const generateAccession = require("../utils/generateAccession");
  // const QuestionPaper = require("../models/QuestionPaper");
  // const ResearchPaper = require("../models/ResearchPaper");

  // // Upload Question Paper
  // router.post("/question-papers", async (req, res) => {
  //   try {
  //     const accessionNumber = await generateAccession("QP");
  //     const newPaper = new QuestionPaper({ ...req.body, accessionNumber });
  //     await newPaper.save();
  //     res.status(201).json(newPaper);
  //   } catch (err) {
  //     res.status(500).json({ error: "Upload failed" });
  //   }
  // });

  // // Upload Research Paper
  // router.post("/research-papers", async (req, res) => {
  //   try {
  //     const accessionNumber = await generateAccession("RP");
  //     const newPaper = new ResearchPaper({ ...req.body, accessionNumber });
  //     await newPaper.save();
  //     res.status(201).json(newPaper);
  //   } catch (err) {
  //     res.status(500).json({ error: "Upload failed" });
  //   }
  // });

  // module.exports = router;
