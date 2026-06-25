import { useState } from "react";

function App() {
  const [gender, setGender] = useState("");
  const [occasion, setOccasion] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);

  const getRecommendations = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend?gender=${gender}&occasion=${occasion}&budget=${budget}&city=${city}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Failed to connect backend");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold">👗 Bharat Fashion AI</h1>

          <p className="text-gray-600 mt-3">
            Personalized fashion recommendations based on city,
            occasion and budget.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>

            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">Select Occasion</option>
              <option value="Wedding">Wedding</option>
              <option value="Festival">Festival</option>
              <option value="Party">Party</option>
              <option value="College">College</option>
              <option value="Office">Office</option>
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">Select City</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Karimnagar">Karimnagar</option>
              <option value="Vijayawada">Vijayawada</option>
            </select>

            <input
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border rounded-lg p-3"
            />
          </div>

          <button
            onClick={getRecommendations}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            Get Recommendations
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Recommended Products
          </h2>

          {results.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-5">
              <p className="text-gray-600">
                No recommendations found for your preferences.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-5"
                >
                  <h3 className="text-xl font-bold">
                    {item.product}
                  </h3>

                  <p className="mt-2">
                    Style: {item.style}
                  </p>

                  <p>
                    City: {item.city}
                  </p>

                  <p>
                    Rating: ⭐ {item.rating}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

