const BASE_URL = "https://uxcandy.com/~shapoval/test-task-backend/v2";

interface IAddTask {
  name: string;
  email: string;
  text: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface IEditTask {
  text: string;
  ID: string;
  status: string;
  authToken: string;
}

export const API = {
  fetchList: (page = 1, sortType = "username", sortDirection = "asc") =>
    fetch(
      `${BASE_URL}/?developer=Artem&page=${page}&sort_field=${sortType}&sort_direction=${sortDirection}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((e) => new Error(e)),
  addTask: ({ name, email, text }: IAddTask) => {
    const formData = new FormData();

    formData.append("username", name);
    formData.append("email", email);
    formData.append("text", text);
    return fetch(`${BASE_URL}/create?developer=Artem`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((e) => new Error(e));
  },
  login: ({ username, password }: ILogin) => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    return fetch(`${BASE_URL}/login?developer=Artem`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((e) => new Error(e));
  },
  editTask: ({ text, status, ID, authToken }: IEditTask) => {
    console.log(text, status, ID, authToken);
    const formData = new FormData();

    formData.append("text", text);
    formData.append("status", status);
    formData.append("token", authToken);

    return fetch(`${BASE_URL}/edit/${ID}?developer=Artem`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((e) => new Error(e));
  },
};
