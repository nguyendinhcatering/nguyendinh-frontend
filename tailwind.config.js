const toTailwind = require("./utils/toTailwind");
const themeUiConfig = require("./styles/theme");
const plugin = require("tailwindcss/plugin");

const config = toTailwind(themeUiConfig);

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  ...config,
  theme: {
    ...config.theme,
    inset: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
    }),
    zIndex: {
      ...config.theme.zIndex,
      bottom: "-9999",
    },
    minWidth: {
      ...config.theme.minWidth,
      screen: "100vw",
    },
    minHeight: {
      ...config.theme.minHeight,
      screen: "100vh",
    },
    width: {
      ...config.theme.width,
      screen: "100vw",
    },
    height: {
      ...config.theme.height,
      screen: "100vh",
    },
    maxWidth: {
      ...config.theme.maxWidth,
      screen: "100vw",
    },
    maxHeight: {
      ...config.theme.maxHeight,
      screen: "100vh",
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("important", ({ container, separator }) => {
        container.walkRules((rule) => {
          rule.selector = `.${e(
            `important${separator}${rule.selector.slice(1)}`
          )}`;
          rule.walkDecls((decls) => (decls.important = true));
        });
      });
    }),
  ],
  variants: {
    width: ["responsive", "important"],
    minWidth: ["responsive", "important"],
    height: ["responsive", "important"],
    minHeight: ["responsive", "important"],
    backgroundOpacity: ["responsive", "hover", "focus", "important"],
    backgroundColor: ["responsive", "hover", "focus", "important"],
    display: ["responsive", "important"],
    margin: ["responsive", "important", "first"],
    padding: ["responsive", "important", "first", "last"],
    textColor: ["responsive", "hover", "focus", "important"],
    fontWeight: ["responsive", "important"],
  },
};
