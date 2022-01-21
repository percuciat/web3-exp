import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div class={styles.spinWrapper}>
      <div class={styles.spinner}></div>
    </div>
  )
}


export default Spinner;
