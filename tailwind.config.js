const toTailwind = require("./utils/toTailwind");
const themeUiConfig = require("./styles/theme");
const plugin = require("tailwindcss/plugin");

const config = toTailwind(themeUiConfig);

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  ...config,
  theme: {
    ...config.theme,
    inset: (theme, {negative}) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
    }),
    zIndex: {
      ...config.theme.zIndex,
      bottom: "-9999",
    },
  },
  plugins: [
    plugin(function ({addVariant, e}) {
      addVariant("important", ({container, separator}) => {
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
    backgroundOpacity: ["responsive", "hover", "focus", "important"],
    backgroundColor: ["responsive", "hover", "focus", "important"],
    display: ["responsive", "important"],
    textColor: ["responsive", "hover", "focus", "important"],
  },
};
