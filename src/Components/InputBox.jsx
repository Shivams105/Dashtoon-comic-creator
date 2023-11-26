import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const InputController = ({ control, errors, name, label, type, width, size, placeholder }) => {
  const modifiedPlaceholder = placeholder ? placeholder : null;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value || ""}
          type={type}
          label={label}
          variant="outlined"
          className={width}
          error={!!errors}
          helperText={errors?.message}
          InputLabelProps={{ required: true }}
          size={size ? size : "small"}
          placeholder={modifiedPlaceholder}
        />
      )}
    />
  );
};
