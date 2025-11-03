const HomeContent = require("../models/HomeContent");

// @desc Get homepage content
// @route GET /api/home-content
const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json(content || {});
  } catch (error) {
    res.status(500).json({ error: "Error fetching home content" });
  }
};

// @desc Update or create homepage content
// @route POST /api/home-content
const updateHomeContent = async (req, res) => {
  try {
    const { imageUrl, headline, subHeadline, buttonText, buttonLink } = req.body;

    let content = await HomeContent.findOne();

    if (content) {
      content.imageUrl = imageUrl;
      content.headline = headline;
      content.subHeadline = subHeadline;
      content.buttonText = buttonText;
      content.buttonLink = buttonLink;
      content.updatedAt = Date.now();
      await content.save();
    } else {
      content = await HomeContent.create({
        imageUrl,
        headline,
        subHeadline,
        buttonText,
        buttonLink,
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ error: "Error updating home content" });
  }
};

module.exports = { getHomeContent, updateHomeContent };
