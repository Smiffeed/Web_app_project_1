import React from "react";
import { FaUsers, FaChartLine, FaClock, FaEnvelope } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>All sites</h2>
        <div className="header-actions">
          <button>Last week</button>
          <button>Set up dashboard</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>21.3K</h3>
            <p>Users</p>
            <p className="stat-change">-2.5%</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>18.5K</h3>
            <p>Sessions</p>
            <p className="stat-change">+1.15%</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>4m 41s</h3>
            <p>Avg session duration</p>
            <p className="stat-change">-3.5%</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaEnvelope />
          </div>
          <div className="stat-info">
            <h3>1.2K</h3>
            <p>Requests received</p>
            <p className="stat-change">+1.15%</p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">Users by source</div>
        <div className="chart">Sessions by country</div>
        <div className="chart">Sessions</div>
      </div>
    </div>
  );
}