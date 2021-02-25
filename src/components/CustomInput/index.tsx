import React from "react";

import styles from "./styles.module.css";

interface IProps {
  value: string;
  onChange?: (event: any) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
}

export const CustomInput = ({
  value,
  onChange,
  error,
  placeholder,
  disabled,
}: IProps) => (
  <div className={styles.container}>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.inputWrapper}
      disabled={disabled}
    />
    {error && <p className={styles.errorText}>{error}</p>}
  </div>
);
