'use client';

import Select from 'react-select'

const sampleOptions = [
  {
    label: "Finland",
    options: [
      {
        label: "Great Hotel",
        value: "Great Hotel",
      },
      {
        label: "Glad Hotel",
        value: "Glad Hotel",
      },
    ],
  },
  {
    label: "Sweden",
    options: [{ label: "Stockholm", value: "Stockholm" }],
  },
];

export default function SelectItem({ label, options, value, onChange }) {
  return (
    <Select
        styles={{
          control: (defaultStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...defaultStyles,
            border: "1px solid rgb(203,213,225)",
            outline: "none !important",
            borderRadius: "0.5rem",
            padding: "0.25rem"
          }),
          option: (defaultStyles, { data, isDisabled, isFocused, isSelected }) => ({
            ...defaultStyles,
            border: "1px solid rgb(203,213,225)",
            borderRadius: "0.5rem",
            margin: ".5rem 0",
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
            border: "1px solid rgb(203,213,225)",
            borderRadius: "0.5rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }),
        }}
        placeholder={label}
        options={sampleOptions}
        isClearable
        noOptionsMessage={() => "ไม่พบข้อมูล"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'rgb(16,185,129)'
          }
        })} 
      />
  );
}
