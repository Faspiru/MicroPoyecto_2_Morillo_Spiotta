import React from "react";
import styles from "./Input.module.css";
import { useState } from "react";

export default function Input({
  labelText,
  placeholder,
  name,
  onChange,
  ...props
}) {
  return (
    <div className={[styles.formGroup, styles.field].join(" ")}>
      <input
        type="text"
        name={name}
        className={styles.formField}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className={styles.formLabel}>{labelText}</label>
    </div>
  );
}
