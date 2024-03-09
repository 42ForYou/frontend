import React from "react";
import PieChart from "../common/PieChart";

const processData = (stats) => {
  // 모드 비율 데이터 생성
  const modeData = [
    { percent: stats.n_tournaments, label: "Tournaments", color: "green" },
    { percent: stats.n_dual_match, label: "1vs1", color: "blue" },
  ];

  // 1vs1 승패 비율 데이터 생성
  const dualData = [
    { percent: stats.n_dual_wins, label: "Wins", color: "gold" },
    { percent: stats.n_dual_looses, label: "Losses", color: "red" },
  ];

  // 토너먼트 최종 랭크 비율 데이터 생성
  const rankDataAggregated = {};
  stats.tournament_stats.forEach((tournament) => {
    tournament.stats.forEach((stat) => {
      const label =
        stat.final_rank === -1 ? "우승" : stat.final_rank === 0 ? "결승전" : `${2 ** (stat.final_rank + 1)}강`;
      if (!rankDataAggregated[label]) {
        rankDataAggregated[label] = {
          percent: 0,
          label: label,
          color: randomColor(),
        };
      }

      rankDataAggregated[label].percent += stat.n_tournaments;
    });
  });

  const rankData = Object.values(rankDataAggregated);

  return { modeData, dualData, rankData };
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const PieChartSection = ({ title, chartData }) => {
  return (
    <div className="text-center" style={{ width: "33%", display: "flex", flexDirection: "column", padding: "10px" }}>
      <h3>{title}</h3>
      <div style={{ flex: 1, minHeight: "200px" }}>
        <PieChart data={chartData} />
      </div>
    </div>
  );
};

const ProfileStats = ({ statsData }) => {
  const { modeData, dualData, rankData } = processData(statsData);

  return (
    <div>
      <h2>Statistics</h2>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <PieChartSection title="플레이한 모드" chartData={modeData} />
        <PieChartSection title="1vs1 승/패" chartData={dualData} />
        <PieChartSection title="토너먼트 최종 진출 라운드" chartData={rankData} />
      </div>
    </div>
  );
};
export default ProfileStats;
