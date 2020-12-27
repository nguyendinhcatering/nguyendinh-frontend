import { jsx, useThemeUI } from "theme-ui";
import ReactSelect from "react-select";

const SelectField = ({ options, field, form, styles, ...props }) => {
  const { theme } = useThemeUI();

  return (
    <ReactSelect
      options={options}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ""
      }
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      styles={{
        control: (styles) => ({
          ...styles,
          minHeight: "44px",
          borderRadius: "none",
          borderColor: theme.colors.gray[5],
        }),
        ...styles,
      }}
      {...props}
    />
  );
};

export default SelectField;
