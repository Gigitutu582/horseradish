import { useEffect } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Trophy, Medal, Award, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function Leaderboard() {
  const { teams, calculateScores } = useHackathon();

  useEffect(() => {
    calculateScores();
  }, [calculateScores]);

  const approvedTeams = teams.filter(t => t.status === "approved");
  const sortedTeams = [...approvedTeams].sort((a, b) => b.totalScore - a.totalScore);

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-8 h-8 text-accent" />;
      case 1:
        return <Medal className="w-7 h-7 text-secondary" />;
      case 2:
        return <Award className="w-6 h-6 text-primary" />;
      default:
        return null;
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
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          ТАБЛИЦА ЛИДЕРОВ
        </h1>
        <p
          className="text-lg opacity-70 mt-4"
          style={{ fontFamily: "'Comfortaa', cursive" }}
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
          className="flex items-center gap-3 px-6 py-3 bg-accent text-accent-foreground border-3 border-accent hover:shadow-[4px_4px_0_rgba(220,20,60,1)] transition-all rounded-lg"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
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
              <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(1)}
                </div>
                <div className="text-center mb-3">
                  <div
                    className="text-4xl mb-1"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    #2
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {sortedTeams[1].name}
                  </h3>
                  <div className="bg-primary text-primary-foreground px-4 py-2 inline-block border-2 border-primary rounded-lg">
                    <span
                      className="text-2xl"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
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
              <div className="border-4 border-accent bg-accent/10 p-6 shadow-[8px_8px_0_rgba(220,20,60,1)] rounded-xl">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(0)}
                </div>
                <div className="text-center mb-3">
                  <div
                    className="text-5xl mb-1 text-accent"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    #1
                  </div>
                  <h3
                    className="text-2xl mb-2"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {sortedTeams[0].name}
                  </h3>
                  <div className="bg-accent text-accent-foreground px-6 py-3 inline-block border-2 border-accent rounded-lg">
                    <span
                      className="text-3xl"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      {sortedTeams[0].totalScore.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-primary/30">
                  <p className="text-sm text-center" style={{ fontFamily: "'Comfortaa', cursive" }}>
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
              <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(2)}
                </div>
                <div className="text-center mb-3">
                  <div
                    className="text-4xl mb-1"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    #3
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {sortedTeams[2].name}
                  </h3>
                  <div className="bg-primary text-primary-foreground px-4 py-2 inline-block border-2 border-primary rounded-lg">
                    <span
                      className="text-2xl"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
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
        className="border-4 border-primary bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(196,30,58,1)] mb-8 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-accent" />
          <h2
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            ВЕСЬ РЕЙТИНГ
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <th
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  МЕСТО
                </th>
                <th
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  КОМАНДА
                </th>
                <th
                  className="text-left py-4 px-4"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  УЧАСТНИКИ
                </th>
                <th
                  className="text-right py-4 px-4"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
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
                  className="border-b border-primary/20 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(index)}
                      <span
                        className="text-xl"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
                      >
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td
                    className="py-4 px-4 text-lg"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {team.name}
                  </td>
                  <td
                    className="py-4 px-4 text-sm opacity-70"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    {team.members.join(", ")}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-block bg-accent text-accent-foreground px-4 py-2 border-2 border-accent rounded-lg">
                      <span
                        className="text-xl"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
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

    </div>
  );
}