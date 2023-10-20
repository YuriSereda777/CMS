import { useState } from "react";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import "./ChartsContainer.css";

const ChartsContainer = ({ complaintsPerMonth, usersPerMonth }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <div className="charts-container">
      <h4 style={{ fontSize: "1.5rem" }}>Monthly Complaints</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? (
        <BarChart data={complaintsPerMonth} />
      ) : (
        <AreaChart data={complaintsPerMonth} />
      )}

      <h4 style={{ marginTop: "40px", fontSize: "1.5rem" }}>Monthly Users</h4>
      {barChart ? (
        <BarChart data={usersPerMonth} />
      ) : (
        <AreaChart data={usersPerMonth} />
      )}
    </div>
  );
};
export default ChartsContainer;
