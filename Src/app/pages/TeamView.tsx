import { useState } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Users, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function TeamView() {
  const { teams, criteria, scores } = useHackathon();
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  const getTeamScores = (teamId: string) => {
    return criteria.map((criterion) => {
      const criterionScores = scores.filter(
        (s) => s.teamId === teamId && s.criterionId === criterion.id
      );

      if (criterionScores.length === 0) {
        return {
          criterion: criterion.name,
          score: 0,
          maxScore: criterion.maxScore,
          weight: criterion.weight,
          juryCount: 0,
        };
      }

      const avgScore =
        criterionScores.reduce((sum, s) => sum + s.score, 0) /
        criterionScores.length;

      return {
        criterion: criterion.name,
        score: avgScore,
        maxScore: criterion.maxScore,
        weight: criterion.weight,
        juryCount: criterionScores.length,
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 
          className="text-5xl sm:text-6xl mb-4 inline-block border-b-4 border-accent pb-2"
          style={{ fontFamily: "'Rubik Mono One', cursive" }}
        >
          МОЯ КОМАНДА
        </h1>
      </motion.div>

      {/* Team Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 border-4 border-black bg-card p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]"
      >
        <label className="block mb-3 text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Выберите вашу команду:
        </label>
        <select
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
          className="w-full px-4 py-3 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
          style={{ fontFamily: "'Special Elite', cursive" }}
        >
          <option value="">-- Выберите команду --</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Team Details */}
      {selectedTeam ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Team Info Card */}
          <div className="border-4 border-black bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary w-16 h-16 flex items-center justify-center border-2 border-black flex-shrink-0">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 
                  className="text-3xl sm:text-4xl mb-2"
                  style={{ fontFamily: "'Rubik Mono One', cursive" }}
                >
                  {selectedTeam.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.members.map((member) => (
                    <div
                      key={member}
                      className="px-3 py-1 bg-muted border-2 border-black"
                      style={{ fontFamily: "'Special Elite', cursive" }}
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="border-4 border-black bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8" />
              <h3 
                className="text-2xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ОЦЕНКИ
              </h3>
            </div>

            <div className="space-y-6">
              {getTeamScores(selectedTeam.id).map((item, index) => (
                <motion.div
                  key={item.criterion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-black bg-muted/20 p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h4 
                        className="text-xl mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.criterion}
                      </h4>
                      <p className="text-sm opacity-70" style={{ fontFamily: "'Special Elite', cursive" }}>
                        Вес: {(item.weight * 100).toFixed(0)}% • Оценили: {item.juryCount} экспертов
                      </p>
                    </div>
                    <div className="bg-accent text-accent-foreground px-6 py-3 border-2 border-black text-center min-w-[100px]">
                      <div className="text-3xl" style={{ fontFamily: "'Rubik Mono One', cursive" }}>
                        {item.score.toFixed(1)}
                      </div>
                      <div className="text-xs opacity-90">/ {item.maxScore}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-muted h-6 border-2 border-black relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-accent h-full flex items-center justify-end px-2"
                    >
                      <span className="text-xs text-accent-foreground">
                        {((item.score / item.maxScore) * 100).toFixed(0)}%
                      </span>
                    </motion.div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: item.maxScore }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(item.score)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Weighted Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 border-4 border-primary bg-primary/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 
                    className="text-2xl mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    ИТОГОВЫЙ БАЛЛ
                  </h4>
                  <p className="text-sm opacity-70" style={{ fontFamily: "'Special Elite', cursive" }}>
                    С учетом всех весов
                  </p>
                </div>
                <div className="bg-primary text-primary-foreground px-8 py-4 border-2 border-black">
                  <div 
                    className="text-5xl"
                    style={{ fontFamily: "'Rubik Mono One', cursive" }}
                  >
                    {selectedTeam.totalScore.toFixed(2)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="border-4 border-black bg-card p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg opacity-70" style={{ fontFamily: "'Special Elite', cursive" }}>
            Выберите команду для просмотра
          </p>
        </div>
      )}
    </div>
  );
}