import React, { useState } from "react";

import "./styles.css";

interface IProps {
  handleSort: (sortType: string, sortDirection: string) => void;
}

export const Sorter = ({ handleSort }: IProps) => {
  const [sortValue, setSortValue] = useState("username asc");

  React.useEffect(() => {
    const words = sortValue.split(" ");
    handleSort(words[0], words[1]);
  }, [handleSort, sortValue]);

  return (
    <div className="sorterContainer">
      <select
        value={sortValue}
        onChange={(event) => setSortValue(event.target.value)}
      >
        <option value="username asc">Имя по возрастанию</option>
        <option value="username desc">Имя по убыванию</option>
        <option value="id asc">ID по возрастанию</option>
        <option value="id desc">ID по убыванию</option>
        <option value="email asc">Email по возрастанию</option>
        <option value="email desc">Email по убыванию</option>
        <option value="status asc">Статус по возрастанию</option>
        <option value="status desc">Статус по убыванию</option>
      </select>
      <div className="sorterWrapper">
        <p className="taskColumn">ID</p>
        <p className="taskColumn">Имя</p>
        <p className="taskColumn">Email</p>
        <p className="taskColumn">Текст</p>
        <p className="taskColumn">Статус</p>
      </div>
    </div>
  );
};
