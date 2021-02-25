import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";

import { AddForm } from "../../components";
import { Sorter } from "../../components";
import { fetchList, logout } from "../../redux/actions";
import "./styles.css";

interface ITask {
  username: string;
  email: string;
  status: number;
  text: string;
  id: number;
}

interface IStore {
  data: {
    tasks: ITask[];
  };
  addedNew: boolean;
  authToken: string;
}

export const MainScreen = () => {
  const dispatch = useDispatch();
  const { data, addedNew, authToken } = useSelector(
    ({ data, addedNew, authToken }: IStore) => ({
      data,
      addedNew,
      authToken,
    })
  );
  const { tasks } = data;
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const [sortType, setSortType] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");
  const history = useHistory();
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editText, setEditText] = useState("");
  const [ID, setID] = useState("");
  const [status, setStatus] = useState(0);
  const [isEditing, toggleEditing] = useState(false);

  React.useEffect(() => {
    dispatch(fetchList(page, sortType, sortDirection));
  }, [dispatch, page, sortType, sortDirection, addedNew]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (inputValue && parseFloat(inputValue)) {
        setPage(parseFloat(inputValue));
      }
    },
    [inputValue]
  );

  const handleSortChange = useCallback(
    (newSortType: string, newSortDirection: string) => {
      setSortType(newSortType);
      setSortDirection(newSortDirection);
    },
    []
  );

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleChangeClick = ({
    oldName,
    oldEmail,
    oldText,
    ID,
    status,
  }: {
    oldName: string;
    oldEmail: string;
    oldText: string;
    ID: string;
    status: number;
  }) => {
    setEditEmail(oldEmail);
    setEditName(oldName);
    setEditText(oldText);
    setID(ID);
    toggleEditing(true);
    setStatus(status);
  };

  const renderStatus = useCallback(
    (status: number) => (
      <>
        {(status === 10 || status === 11) && (
          <AiFillCheckCircle color="green" size={20} />
        )}
        {(status === 0 || status === 1) && (
          <AiOutlineClose color="red" size={20} />
        )}
      </>
    ),
    []
  );

  const renderTask = useCallback(
    ({ username, email, text, status, id }: ITask) => (
      <div className="taskItem" key={id}>
        <div className="taskColumn">
          <p className="taskColumnText">{id}</p>
        </div>
        <div className="taskColumn">
          <p className="taskColumnText">{username}</p>
        </div>
        <div className="taskColumn">
          <p className="taskColumnText">{email}</p>
        </div>
        <div className="taskColumn">
          <p className="taskColumnText">{text}</p>
        </div>
        <div className="taskColumn">
          <p className="taskColumnText">{renderStatus(status)}</p>
        </div>
        {authToken && (
          <button
            className="changeButton"
            onClick={() =>
              handleChangeClick({
                oldEmail: email,
                oldName: username,
                oldText: text,
                ID: id.toString(),
                status,
              })
            }
          >
            Изменить
          </button>
        )}
      </div>
    ),
    [authToken]
  );

  const handlePreviousPress = useCallback(() => {
    const prevPage = page - 1;
    setPage(prevPage ? prevPage : 1);
    setInputValue(prevPage ? prevPage.toString() : "1");
  }, [page]);

  const handleNextPress = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage ? nextPage : 1);
    setInputValue(nextPage ? nextPage.toString() : "1");
  }, [page]);

  const handleLoginClick = () => {
    if (authToken) {
      dispatch(logout());
      return;
    }
    history.push("/login");
  };

  return (
    <header className="header">
      <div className="mainContainer">
        <p>Привет, {authToken ? "Админ" : "Новый пользователь"}</p>
        <Sorter handleSort={handleSortChange} />
        {tasks.map(({ username, email, status, text, id }: ITask) =>
          renderTask({ username, email, status, text, id })
        )}
        {authToken && isEditing && (
          <AddForm
            isEdit={true}
            editEmail={editEmail}
            editName={editName}
            editText={editText}
            oldStatus={status}
            ID={ID}
          />
        )}
        <AddForm />
        <div className="bottomWrapper">
          <button onClick={handleLoginClick}>
            {authToken ? "Выйти" : "Войти"}
          </button>
          <div className="pageFormWrapper">
            <button onClick={handlePreviousPress}>{`<`}</button>
            <form className="pageForm" onSubmit={handleSubmit}>
              <input
                value={inputValue}
                onChange={(event) => handleChange(event.target.value)}
                className="pageInput"
              />
            </form>
            <button onClick={handleNextPress}>{`>`}</button>
          </div>
        </div>
      </div>
    </header>
  );
};
