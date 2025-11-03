const HomeContent = require("../models/HomeContent");

// @desc Get all homepage hero sections
// @route GET /api/home-content
const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.find().sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Error fetching home content" });
  }
};

// @desc Add a new homepage hero section
// @route POST /api/home-content
const addHomeContent = async (req, res) => {
  try {
    const {
      imageUrl,
      headline,
      subHeadline,
      buttonText,
      buttonLink,
      headlineColor,
      subHeadlineColor,
    } = req.body;

    const content = await HomeContent.create({
      imageUrl,
      headline,
      subHeadline,
      buttonText,
      buttonLink,
      headlineColor,
      subHeadlineColor,
    });

    res.status(201).json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding home content" });
  }
};

// @desc Update an existing homepage hero section
// @route PUT /api/home-content/:id
const updateHomeContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      imageUrl,
      headline,
      subHeadline,
      buttonText,
      buttonLink,
      headlineColor,
      subHeadlineColor,
    } = req.body;

    const updatedContent = await HomeContent.findByIdAndUpdate(
      id,
      {
        imageUrl,
        headline,
        subHeadline,
        buttonText,
        buttonLink,
        headlineColor,
        subHeadlineColor,
      },
      { new: true } // return updated doc
    );

    if (!updatedContent) {
      return res.status(404).json({ error: "Home content not found" });
    }

    res.json({ success: true, updatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating home content" });
  }
};

// @desc Delete an existing hero section
// @route DELETE /api/home-content/:id
const deleteHomeContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HomeContent.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Home content not found" });
    }

    res.json({ success: true, message: "Hero section deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting home content" });
  }
};

module.exports = {
  getHomeContent,
  addHomeContent,
  updateHomeContent,
  deleteHomeContent,
};
