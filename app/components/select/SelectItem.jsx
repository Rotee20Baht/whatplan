'use client';

import Select from 'react-select';

export default function SelectItem({ label, options, value, onChange = () => {}, onInputChange = () => {}, required }) {
  return (
    <Select
        value={value}
        onChange={(value) => onChange(value)}
        onInputChange={(value) => onInputChange(value)}
        styles={{
          control: (defaultStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...defaultStyles,
            border: "1px solid rgb(212, 212, 212)",
            outline: "none !important",
            borderRadius: "0.5rem",
            padding: "0.25rem",
            height: "100%"
          }),
          option: (defaultStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...defaultStyles,
            border: "1px solid rgb(212, 212, 212)",
            borderRadius: "0.5rem",
            margin: ".5rem 0",
            maxWidth: "100%",
            backgroundColor: isSelected
              ? "rgb(16,185,129)"
              : "rgb(245,245,245)",
            transition: ".2s all cubic-bezier(0.4, 0, 0.2, 1)",
          }),
          group: (defaultStyles) => ({
            ...defaultStyles,
            padding: ".5rem .75rem 0 .75rem",
          }),
          menu: (defaultStyles) => ({
            ...defaultStyles,
            zIndex: "20",
            boxShadow: "none",
            background: "#fff",
            border: "1px solid rgb(212, 212, 212)",
            borderRadius: "0.5rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }),
          container: (defaultStyles) => ({
            ...defaultStyles,
            height: "100%",
          }),
        }}
        placeholder={label}
        options={options}
        isClearable
        noOptionsMessage={() => "ไม่พบข้อมูล"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'rgb(16,185,129)'
          }
        })}
        required={required} 
      />
  );
}
