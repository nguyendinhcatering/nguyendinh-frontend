import * as React from "react";

const handleScriptAttributes = (script, otherProps) => {
  for (const [attr, value] of Object.entries(otherProps)) {
    script.setAttribute(attr, value);
  }
};

const ScriptLoader = ({
  onCreate = () => null,
  onLoad = () => null,
  onError = (e) => {
    throw new URIError(`The script ${e.target.src} is not accessible`);
  },
  delayMs = 0,
  htmlPart = "head",
  src,
  ...otherProps
}) => {
  const appendScript = React.useCallback(() => {
    const script = global.document.createElement("script");

    script.src = src;

    if (otherProps) {
      handleScriptAttributes(script, otherProps);
    }

    script.onload = onLoad;
    script.onerror = onError;

    global.document[htmlPart].appendChild(script);

    onCreate();
  }, [onCreate, onError, onLoad, otherProps, src, htmlPart]);

  React.useEffect(() => {
    const timeout = setTimeout(() => appendScript(), delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [appendScript, delayMs]);

  return null;
};

const appendScript = ({
  id,
  scriptText,
  src,
  optionalCallback = () => null,
  htmlPart = "head",
  otherProps = {},
}) => {
  try {
    const existentScript = global.document.getElementById(id);
    const script = existentScript || global.document.createElement("script");

    script.id = id;
    if (src) {
      script.src = src;
    }

    if (scriptText) {
      script.innerText = scriptText.toString();
    }

    handleScriptAttributes(script, otherProps);

    global.document[htmlPart].appendChild(script);

    optionalCallback();

    return true;
  } catch (error) {
    console.error("Must be a string!", error);

    return false;
  }
};

export function useScript() {
  return React.useMemo(() => ({ ScriptLoader, appendScript }), []);
}
