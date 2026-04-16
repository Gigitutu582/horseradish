import { useEffect } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Trophy, Medal, Award, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function Leaderboard() {
  const { teams, calculateScores } = useHackathon();

  useEffect(() => {
    calculateScores();
  }, [calculateScores]);

  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  const chartData = sortedTeams.map((team) => ({
    name: team.name,
    score: parseFloat(team.totalScore.toFixed(2)),
  }));

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-8 h-8 text-yellow-600" />;
      case 1:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return null;
    }
  };

  const getBarColor = (index: number) => {
    switch (index) {
      case 0:
        return "#d32f2f";
      case 1:
        return "#1a1a1a";
      case 2:
        return "#7b7b7b";
      default:
        return "#d4c9a8";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 
          className="text-5xl sm:text-7xl mb-4 inline-block border-b-4 border-accent pb-2"
          style={{ fontFamily: "'Rubik Mono One', cursive" }}
        >
          ТАБЛИЦА ЛИДЕРОВ
        </h1>
        <p 
          className="text-lg opacity-70 mt-4"
          style={{ fontFamily: "'Special Elite', cursive" }}
        >
          Баллы считаются автоматически
        </p>
      </motion.div>

      {/* Refresh Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={calculateScores}
          className="flex items-center gap-3 px-6 py-3 bg-accent text-accent-foreground border-2 border-black hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <RefreshCw className="w-5 h-5" />
          ОБНОВИТЬ БАЛЛЫ
        </button>
      </motion.div>

      {/* Podium / Top 3 */}
      {sortedTeams.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:order-1 md:mt-12"
            >
              <div className="border-4 border-black bg-card p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(1)}
                </div>
                <div className="text-center mb-3">
                  <div 
                    className="text-4xl mb-1"
                    style={{ fontFamily: "'Rubik Mono One', cursive" }}
                  >
                    #2
                  </div>
                  <h3 
                    className="text-xl mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {sortedTeams[1].name}
                  </h3>
                  <div className="bg-primary text-primary-foreground px-4 py-2 inline-block border-2 border-black">
                    <span 
                      className="text-2xl"
                      style={{ fontFamily: "'Rubik Mono One', cursive" }}
                    >
                      {sortedTeams[1].totalScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:order-2"
            >
              <div className="border-4 border-accent bg-accent/10 p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(0)}
                </div>
                <div className="text-center mb-3">
                  <div 
                    className="text-5xl mb-1 text-accent"
                    style={{ fontFamily: "'Rubik Mono One', cursive" }}
                  >
                    #1
                  </div>
                  <h3 
                    className="text-2xl mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {sortedTeams[0].name}
                  </h3>
                  <div className="bg-accent text-accent-foreground px-6 py-3 inline-block border-2 border-black">
                    <span 
                      className="text-3xl"
                      style={{ fontFamily: "'Rubik Mono One', cursive" }}
                    >
                      {sortedTeams[0].totalScore.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-black/20">
                  <p className="text-sm text-center" style={{ fontFamily: "'Special Elite', cursive" }}>
                    {sortedTeams[0].members.join(", ")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="md:order-3 md:mt-12"
            >
              <div className="border-4 border-black bg-card p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(2)}
                </div>
                <div className="text-center mb-3">
                  <div 
                    className="text-4xl mb-1"
                    style={{ fontFamily: "'Rubik Mono One', cursive" }}
                  >
                    #3
                  </div>
                  <h3 
                    className="text-xl mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {sortedTeams[2].name}
                  </h3>
                  <div className="bg-primary text-primary-foreground px-4 py-2 inline-block border-2 border-black">
                    <span 
                      className="text-2xl"
                      style={{ fontFamily: "'Rubik Mono One', cursive" }}
                    >
                      {sortedTeams[2].totalScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Full Rankings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="border-4 border-black bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8" />
          <h2 
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ВЕСЬ РЕЙТИНГ
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th 
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  МЕСТО
                </th>
                <th 
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  КОМАНДА
                </th>
                <th 
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  УЧАСТНИКИ
                </th>
                <th 
                  className="text-right py-4 px-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  БАЛЛ
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <motion.tr
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="border-b border-black/20 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(index)}
                      <span 
                        className="text-xl"
                        style={{ fontFamily: "'Rubik Mono One', cursive" }}
                      >
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td 
                    className="py-4 px-4 text-lg"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {team.name}
                  </td>
                  <td 
                    className="py-4 px-4 text-sm opacity-70"
                    style={{ fontFamily: "'Special Elite', cursive" }}
                  >
                    {team.members.join(", ")}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-block bg-accent text-accent-foreground px-4 py-2 border-2 border-black">
                      <span 
                        className="text-xl"
                        style={{ fontFamily: "'Rubik Mono One', cursive" }}
                      >
                        {team.totalScore.toFixed(2)}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Chart Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="border-4 border-black bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)]"
      >
        <h2 
          className="text-2xl sm:text-3xl mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ГРАФИК
        </h2>

        <div className="h-[400px] sm:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" strokeOpacity={0.2} />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                style={{ fontFamily: "'Special Elite', cursive", fontSize: '12px' }}
              />
              <YAxis 
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ebe2c3',
                  border: '2px solid #1a1a1a',
                  fontFamily: "'Special Elite', cursive",
                }}
              />
              <Legend 
                wrapperStyle={{
                  fontFamily: "'Montserrat', sans-serif",
                }}
              />
              <Bar 
                dataKey="score" 
                name="Итоговый балл"
                stroke="#1a1a1a"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}