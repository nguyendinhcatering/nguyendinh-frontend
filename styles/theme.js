const colors = require("./themeComponents/colors");
const typography = require("./themeComponents/typography");
const shadows = require("./themeComponents/shadows");
const styles = require("./themeComponents/styles");
const variants = require("./themeComponents/variants");
const animations = require("./themeComponents/animations");
const spacing = require("./themeComponents/spacing");

const theme = {
  breakpoints: ["640px", "768px", "1024px", "1280px"],
  ...colors,
  ...spacing,
  ...typography,
  ...shadows,
  ...animations,
  ...variants,
  styles,
};

module.exports = theme;
