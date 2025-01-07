import React, { useEffect, useState } from "react";
import axios from "axios";

const PredictionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Flask API
    axios
      .get("http://localhost:5000/predict_from_csv") // Make sure this URL matches the Flask endpoint
      .then((response) => {
        setData(response.data.predictions); // Set the predictions data returned from Flask
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data from server");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Display the result in a table
  return (
    <div>
      <h1>Prediction Results</h1>
      <table>
        <thead>
          <tr>
            <th>Sender Account</th>
            <th>Receiver Account</th>
            <th>Amount</th>
            <th>Prediction</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Sender_account}</td>
              <td>{row.Receiver_account}</td>
              <td>{row.Amount}</td>
              <td>{row.Prediction >= 0.5 ? "Suspicious" : "Not Suspicious"}</td>
              <td>{row.Label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionPage;
