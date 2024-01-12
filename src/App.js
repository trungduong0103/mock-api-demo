import "./styles.css";
import React from "react";
import MagicInput from "./MagicInput";
import { MOCK_API_URL } from "./constants";
import { dataMapper } from "./data-mapper";

function Card({ cardData }) {
  const { cardTitle, cardImage, cardDescription } = cardData;
  return (
    <div className="card">
      <img src={cardImage} alt={cardTitle} />

      <div className="cardBody">
        <strong>{cardTitle}</strong>
        <p>{cardDescription}</p>
      </div>
    </div>
  );
}

function CardsRenderer({ cards, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(cards) || cards.length === 0) {
    return <p>No cats found...</p>;
  }

  if (cards.length === 1) {
    return <Card cardData={cards[0]} />;
  }

  return (
    <div className="cardList">
      {cards.map(({ id, ...cardData }) => (
        <Card key={id} cardData={cardData} />
      ))}
    </div>
  );
}

function APIModifier({ apiEndpoint, setApiEndpoint }) {
  const [limit] = React.useState(() => {
    const params = new URLSearchParams(apiEndpoint);
    return params.get("limit");
  });

  function handleBlur(event) {
    if (!Number.isNaN(Number(event.target.value))) {
      const newLimit = event.target.value;
      const urlParts = apiEndpoint.split("?");
      const baseUrl = urlParts[0];
      const queryParams = urlParts[1].split("&");
      setApiEndpoint(`${baseUrl}?${queryParams[0]}&limit=${newLimit}`);
    }
  }

  return (
    <div style={{ display: "block" }}>
      <a
        href={apiEndpoint}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginBottom: 10, display: "block" }}
      >
        {apiEndpoint}
      </a>
      <form style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
        Get me{" "}
        <MagicInput
          type="text"
          min={0}
          title="limit"
          defaultValue={limit}
          onBlur={handleBlur}
          size={limit.length}
        />{" "}
        cats
      </form>
    </div>
  );
}

export default function App() {
  const [apiEndpoint, setApiEndpoint] = React.useState(MOCK_API_URL);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(apiEndpoint, { method: "GET" })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.map(dataMapper));
        setLoading(false);
      });
  }, [apiEndpoint]);

  return (
    <div className="App">
      <APIModifier apiEndpoint={apiEndpoint} setApiEndpoint={setApiEndpoint} />
      <CardsRenderer loading={loading} cards={data} />
    </div>
  );
}
