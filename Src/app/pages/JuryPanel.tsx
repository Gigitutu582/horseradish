import { useState, useEffect } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Award, Star, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import Chat from "../components/Chat";

export default function JuryPanel() {
  const { teams, criteria, scores, currentJury, addScore, setCurrentJury } = useHackathon();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [juryName, setJuryName] = useState<string>(currentJury);

  useEffect(() => {
    if (juryName && juryName !== currentJury) {
      setCurrentJury(juryName);
    }
  }, [juryName, currentJury, setCurrentJury]);

  const approvedTeams = teams.filter(t => t.status === "approved");

  const getScore = (teamId: string, criterionId: string) => {
    const score = scores.find(
      (s) => s.teamId === teamId && s.criterionId === criterionId && s.juryId === currentJury
    );
    return score?.score || 0;
  };

  const handleScoreChange = (teamId: string, criterionId: string, score: number) => {
    addScore({ teamId, criterionId, score });
  };

  const isTeamFullyScored = (teamId: string) => {
    return criteria.every((criterion) => {
      const score = scores.find(
        (s) => s.teamId === teamId && s.criterionId === criterion.id && s.juryId === currentJury
      );
      return score && score.score > 0;
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
          ПАНЕЛЬ ЖЮРИ
        </h1>
      </motion.div>

      {/* Jury Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl"
      >
        <label className="block mb-3 text-lg" style={{ fontFamily: "'Bebas Neue', cursive" }}>
          Ваше имя:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={juryName}
            onChange={(e) => setJuryName(e.target.value)}
            className="flex-1 px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
            placeholder="Введите ваше имя"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          />
          <div className="bg-accent text-accent-foreground px-6 py-3 border-3 border-accent flex items-center gap-2 rounded-lg">
            <Award className="w-5 h-5" />
            <span style={{ fontFamily: "'Bebas Neue', cursive" }}>ЭКСПЕРТ</span>
          </div>
        </div>
      </motion.div>

      {/* Team Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3">
          {approvedTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`
                px-6 py-3 border-3 transition-all flex items-center gap-2 rounded-lg
                ${selectedTeam === team.id
                  ? "bg-accent text-accent-foreground border-accent shadow-[4px_4px_0_rgba(220,20,60,1)]"
                  : "bg-card border-primary hover:shadow-[3px_3px_0_rgba(196,30,58,1)]"
                }
              `}
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              {team.name}
              {isTeamFullyScored(team.id) && (
                <CheckCircle className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scoring Form */}
        <div>
          {selectedTeam ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-4 border-primary bg-card p-6 sm:p-8 shadow-[8px_8px_0_rgba(196,30,58,1)] rounded-xl"
            >
              <div className="mb-8">
                <h2
                  className="text-3xl mb-2"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {approvedTeams.find((t) => t.id === selectedTeam)?.name}
                </h2>
                <p className="text-sm opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
                  Участники: {approvedTeams.find((t) => t.id === selectedTeam)?.members.join(", ")}
                </p>
              </div>

              <div className="space-y-6">
                {criteria.map((criterion) => {
                  const currentScore = getScore(selectedTeam, criterion.id);

                  return (
                    <div
                      key={criterion.id}
                      className="border-3 border-primary bg-muted/20 p-4 sm:p-6 rounded-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3
                            className="text-xl mb-1"
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                          >
                            {criterion.name}
                          </h3>
                          <p className="text-sm opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
                            Вес: {(criterion.weight * 100).toFixed(0)}% • Макс: {criterion.maxScore} баллов
                          </p>
                        </div>
                        <div className="bg-primary text-primary-foreground px-4 py-2 border-2 border-primary text-center min-w-[80px] rounded-lg">
                          <div className="text-2xl" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                            {currentScore}
                          </div>
                          <div className="text-xs opacity-80">/ {criterion.maxScore}</div>
                        </div>
                      </div>

                      {/* Score Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: criterion.maxScore + 1 }, (_, i) => i).map((score) => (
                          <button
                            key={score}
                            onClick={() => handleScoreChange(selectedTeam, criterion.id, score)}
                            className={`
                              px-4 py-2 border-2 transition-all min-w-[48px] rounded-lg
                              ${currentScore === score
                                ? "bg-accent text-accent-foreground border-accent shadow-[3px_3px_0_rgba(220,20,60,1)]"
                                : "bg-card border-primary hover:bg-muted"
                              }
                            `}
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                          >
                            {score}
                          </button>
                        ))}
                      </div>

                      {/* Star Rating Visual */}
                      <div className="flex gap-1 mt-3">
                        {Array.from({ length: criterion.maxScore }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < currentScore
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Completion Status */}
              {isTeamFullyScored(selectedTeam) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 border-4 border-accent bg-accent/10 p-6 flex items-center gap-4 rounded-lg"
                >
                  <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-lg mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      ГОТОВО!
                    </h4>
                    <p className="text-sm opacity-80" style={{ fontFamily: "'Comfortaa', cursive" }}>
                      Вы оценили эту команду по всем критериям
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="border-4 border-primary bg-card p-12 text-center rounded-xl">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-30 text-accent" />
              <p className="text-lg opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
                Выберите команду для оценки
              </p>
            </div>
          )}
        </div>

        {/* Chat */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Chat channel="jury" userName={juryName || "Эксперт"} />
        </motion.div>
      </div>
    </div>
  );
}
