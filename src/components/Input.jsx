import React from "react";
import styles from "./Input.module.css";
import { useState } from "react";

export default function Input({ labelText, placeholder, ...props }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={[styles.formGroup, styles.field].join(" ")}>
      <input
        type="text"
        className={styles.formField}
        placeholder={placeholder}
        value={inputValue}
        onChange={(ev) => setInputValue(ev.target.value)}
      />
      <label className={styles.formLabel}>{labelText}</label>
    </div>
  );
}
