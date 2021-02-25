import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomInput } from "../../components";
import { login } from "../../redux/actions";

import styles from "./styles.module.css";

interface IAuth {
  authError: {
    username: string;
    password: string;
  };
  authToken: string;
}

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    username: usernameError,
    password: passwordError,
    authToken,
  } = useSelector(({ authError, authToken }: IAuth) => ({
    ...authError,
    authToken,
  }));

  React.useEffect(() => {
    if (authToken) {
      history.push("/");
    }
  }, [authToken, history]);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(login({ username, password }));
    },
    [dispatch, password, username]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <CustomInput
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          error={usernameError}
        />
        <CustomInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          error={passwordError}
        />
        <input type="submit" value="Войти" />
      </form>
    </div>
  );
};
