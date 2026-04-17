import { useState, useEffect } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Users, TrendingUp, Award } from "lucide-react";
import { motion } from "motion/react";
import Chat from "../components/Chat";

export default function TeamView() {
  const { teams, criteria, scores, calculateScores } = useHackathon();
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  useEffect(() => {
    calculateScores();
  }, [calculateScores]);

  const approvedTeams = teams.filter(t => t.status === "approved");
  const selectedTeam = approvedTeams.find((t) => t.id === selectedTeamId);

  const getTeamCriteriaScores = (teamId: string) => {
    return criteria.map((criterion) => {
      const criterionScores = scores.filter(
        (s) => s.teamId === teamId && s.criterionId === criterion.id
      );

      const avgScore = criterionScores.length > 0
        ? criterionScores.reduce((sum, s) => sum + s.score, 0) / criterionScores.length
        : 0;

      return {
        criterion: criterion.name,
        score: avgScore,
        maxScore: criterion.maxScore,
        weight: criterion.weight,
        weightedScore: avgScore * criterion.weight,
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1
          className="text-5xl sm:text-6xl mb-4 inline-block border-b-4 border-accent pb-2"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          ПАНЕЛЬ УЧАСТНИКА
        </h1>
      </motion.div>

      {/* Team Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
          <label className="block mb-3 text-lg" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Выберите вашу команду:
          </label>
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="w-full px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            <option value="">-- Выбрать команду --</option>
            {approvedTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {selectedTeam ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border-4 border-primary bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(196,30,58,1)] rounded-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary w-12 h-12 flex items-center justify-center border-2 border-primary rounded-lg">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {selectedTeam.name}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-70 mb-2" style={{ fontFamily: "'Comfortaa', cursive" }}>
                    Участники:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.members.map((member) => (
                      <div
                        key={member}
                        className="px-3 py-2 bg-secondary/30 border-2 border-secondary rounded-full"
                      >
                        <span style={{ fontFamily: "'Comfortaa', cursive" }}>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-primary/30">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      ИТОГОВЫЙ БАЛЛ
                    </span>
                    <div className="bg-accent text-accent-foreground px-6 py-3 border-2 border-accent rounded-lg">
                      <span
                        className="text-3xl"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
                      >
                        {selectedTeam.totalScore.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Criteria Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border-4 border-primary bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(196,30,58,1)] rounded-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent w-12 h-12 flex items-center justify-center border-2 border-accent rounded-lg">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  ДЕТАЛИЗАЦИЯ
                </h2>
              </div>

              <div className="space-y-4">
                {getTeamCriteriaScores(selectedTeam.id).map((item, index) => (
                  <div
                    key={index}
                    className="border-2 border-primary bg-muted/20 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4
                          className="text-lg mb-1"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          {item.criterion}
                        </h4>
                        <p
                          className="text-sm opacity-70"
                          style={{ fontFamily: "'Comfortaa', cursive" }}
                        >
                          Вес: {(item.weight * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-2xl text-accent"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          {item.score.toFixed(1)}
                        </div>
                        <div className="text-xs opacity-70">/ {item.maxScore}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-3 bg-muted border-2 border-primary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary to-accent transition-all"
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Chat channel="participants" userName={selectedTeam.name} />
          </motion.div>
        </div>
      ) : (
        <div className="border-4 border-primary bg-card p-12 text-center rounded-xl">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-30 text-accent" />
          <p className="text-lg opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
            Выберите вашу команду для просмотра результатов
          </p>
        </div>
      )}
    </div>
  );
}
