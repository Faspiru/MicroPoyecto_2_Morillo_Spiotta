import React from "react";
import styles from "./Input.module.css";
import { useState } from "react";

export default function Input({
  labelText,
  placeholder,
  name,
  onChange,
  type,
  max,
  min,
  ...props
}) {
  return (
    <div className={[styles.formGroup, styles.field].join(" ")} {...props}>
      <input
        type={type}
        max={max}
        min={min}
        name={name}
        className={styles.formField}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className={styles.formLabel}>{labelText}</label>
    </div>
  );
}
