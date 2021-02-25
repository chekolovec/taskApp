import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";

import { CustomInput } from "../";
import styles from "./styles.module.css";
import { addTask, editTask } from "../../redux/actions";

interface IError {
  addError: {
    email: string;
    text: string;
    username: string;
  };
}

interface IProps {
  editName?: string;
  editEmail?: string;
  editText?: string;
  ID?: string;
  isEdit?: boolean;
  oldStatus?: number;
}

export const AddForm = ({
  editName = "",
  editEmail = "",
  editText = "",
  ID = "",
  oldStatus = 0,
  isEdit = false,
}: IProps) => {
  const [name, setName] = useState(editName);
  const [email, setEmail] = useState(editEmail);
  const [text, setText] = useState(editText);
  const dispatch = useDispatch();
  const errors = useSelector(({ addError }: IError) => addError);
  const authToken = useSelector(
    ({ authToken }: { authToken: string }) => authToken
  );
  const [status, setStatus] = useState(oldStatus);
  const handleAddSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(addTask({ name, email, text }));
    },
    [dispatch, email, name, text]
  );

  const renderStatus = useCallback(
    () => (
      <>
        {(status === 10 || status === 11) && (
          <button className={styles.statusButton} onClick={() => setStatus(1)}>
            <AiFillCheckCircle color="green" size={20} />
          </button>
        )}
        {(status === 0 || status === 1) && (
          <button className={styles.statusButton} onClick={() => setStatus(11)}>
            <AiOutlineClose color="red" size={20} />
          </button>
        )}
      </>
    ),
    [status]
  );

  const handleEditSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(editTask({ text, ID, authToken, status }));
    },
    [ID, authToken, dispatch, status, text]
  );

  React.useEffect(() => {
    setName(editName);
    setText(editText);
    setEmail(editEmail);
    setStatus(oldStatus);
  }, [editEmail, editName, editText, oldStatus]);

  return (
    <form
      className="addForm"
      onSubmit={isEdit ? handleEditSubmit : handleAddSubmit}
    >
      {isEdit && <CustomInput disabled placeholder="ID" value={ID} />}
      <CustomInput
        disabled={isEdit}
        placeholder="Имя"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.username}
      />
      <CustomInput
        disabled={isEdit}
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
      />
      <CustomInput
        placeholder="Текст"
        value={text}
        onChange={(event) => setText(event.target.value)}
        error={errors.text}
      />
      {isEdit && renderStatus()}
      <input type="submit" value={isEdit ? "Изменить" : "Добавить"} />
    </form>
  );
};
