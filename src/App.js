import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleRepositories();
  }, []);

  async function handleRepositories() {
    const { data } = await api.get("/repositories");

    setRepositories(data);
  }

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `Project ${Date.now()}`,
      url: "google.com",
      techs: ["React.js", "Node.js"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const reps = repositories.filter((rep) => rep.id !== id);

    setRepositories(reps);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
