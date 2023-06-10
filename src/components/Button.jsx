import React from "react";
import styles from "./Button.module.css";

export default function Button({ size = "base", ...props }) {
  return props.href ? (
    <a className={[styles.button, styles[size]].join(" ")} {...props} />
  ) : (
    <button className={[styles.button, styles[size]].join(" ")} {...props} />
  );
}
