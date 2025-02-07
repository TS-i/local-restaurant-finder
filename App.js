// (React Frontend)
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRestaurants = async () => {
    const response = await fetch(`https://local-restaurant-finder.onrender.com//search?location=${query}`);
    const data = await response.json();
    setResults(data.restaurants);
  };

  return (
    <div>
      <h1>Find Local Restaurants</h1>
      <input type="text" placeholder="Enter city or zip code" onChange={(e) => setQuery(e.target.value)} />
      <button onClick={searchRestaurants}>Search</button>
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong> - {r.address} (⭐ {r.rating})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
