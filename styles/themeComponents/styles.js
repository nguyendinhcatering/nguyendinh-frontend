const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
    "*:focus": {
      outline: "none",
      outlineWidth: 0,
    },
  },
  a: {
    color: "primary",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  h1: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 1,
    fontSize: 6,
    mt: 2,
  },
  h2: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 1,
    fontSize: 5,
    mt: 2,
  },
  h3: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 1,
    fontSize: 4,
    mt: 3,
  },
  h4: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 1,
    fontSize: 3,
  },
  h5: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 1,
    fontSize: 2,
  },
  h6: {
    fontFamily: "heading",
    fontWeight: "heading",
    lineHeight: "heading",
    m: 0,
    mb: 2,
    fontSize: 1,
  },
  p: {
    opacity: 0.8,
  },
  code: {},
  pre: {},
  hr: {
    bg: "muted",
    border: 0,
    height: "1px",
    m: 1,
  },
  ul: {
    listStyle: "disc",
    listStylePosition: "inside",
  },
  ol: {
    listStyle: "decimal",
    listStylePosition: "inside",
  },
};

module.exports = styles;
