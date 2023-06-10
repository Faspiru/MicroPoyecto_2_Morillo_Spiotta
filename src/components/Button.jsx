import React from "react";
import styles from "./Button.module.css";

export default function Button({
  size = "base",
  variant = "filled",
  ...props
}) {
  return props.href ? (
    <a
      className={[styles.button, styles[size], styles[variant]].join(" ")}
      {...props}
    />
  ) : (
    <button
      className={[styles.button, styles[size], styles[variant]].join(" ")}
      {...props}
    />
  );
}
