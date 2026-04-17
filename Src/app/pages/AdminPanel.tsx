import { useState } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Plus, X, Users as UsersIcon, Target, CheckCircle, XCircle, Clock } from "lucide-react";
import { motion } from "motion/react";
import Chat from "../components/Chat";

export default function AdminPanel() {
  const { teams, criteria, addTeam, addCriterion, approveTeam, rejectTeam } = useHackathon();
  
  const [teamName, setTeamName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  
  const [criterionName, setCriterionName] = useState("");
  const [weight, setWeight] = useState("");
  const [maxScore, setMaxScore] = useState("");

  const handleAddMember = () => {
    if (memberInput.trim() && !members.includes(memberInput.trim())) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleRemoveMember = (member: string) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() && members.length > 0) {
      addTeam({ name: teamName, members });
      setTeamName("");
      setMembers([]);
    }
  };

  const handleAddCriterion = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const ms = parseInt(maxScore);
    
    if (criterionName.trim() && !isNaN(w) && !isNaN(ms) && w > 0 && ms > 0) {
      addCriterion({ name: criterionName, weight: w, maxScore: ms });
      setCriterionName("");
      setWeight("");
      setMaxScore("");
    }
  };

  const pendingTeams = teams.filter(t => t.status === "pending");
  const approvedTeams = teams.filter(t => t.status === "approved");

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
          АДМИНКА
        </h1>
      </motion.div>

      {/* Pending Registrations */}
      {pendingTeams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="border-4 border-accent bg-accent/10 p-6 shadow-[6px_6px_0_rgba(220,20,60,1)]">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-accent" />
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ЗАЯВКИ НА РЕГИСТРАЦИЮ ({pendingTeams.length})
              </h2>
            </div>

            <div className="space-y-3">
              {pendingTeams.map((team) => (
                <div
                  key={team.id}
                  className="border-3 border-primary bg-card p-4 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h4
                      className="text-lg mb-1"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      {team.name}
                    </h4>
                    <p
                      className="text-sm opacity-70"
                      style={{ fontFamily: "'Comfortaa', cursive" }}
                    >
                      {team.members.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveTeam(team.id)}
                      className="px-4 py-2 bg-primary text-primary-foreground border-2 border-primary hover:shadow-[3px_3px_0_rgba(196,30,58,1)] transition-all rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Принять
                    </button>
                    <button
                      onClick={() => rejectTeam(team.id)}
                      className="px-4 py-2 bg-destructive text-destructive-foreground border-2 border-destructive hover:shadow-[3px_3px_0_rgba(160,19,31,1)] transition-all rounded-lg flex items-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Отказать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Team Registration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-2 border-primary rounded-lg">
                <UsersIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ДОБАВИТЬ КОМАНДУ
              </h2>
            </div>

            <form onSubmit={handleAddTeam} className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Comfortaa', cursive" }}>
                  Название команды
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                  placeholder="Крутые Программисты"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Comfortaa', cursive" }}>
                  Участники
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMember())}
                    className="flex-1 px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                    placeholder="Имя участника"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="px-4 py-3 bg-accent text-accent-foreground border-3 border-accent hover:shadow-[3px_3px_0_rgba(220,20,60,1)] transition-all rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {members.map((member) => (
                    <div
                      key={member}
                      className="flex items-center gap-2 px-3 py-2 bg-secondary/30 border-2 border-secondary text-sm rounded-full"
                    >
                      <span style={{ fontFamily: "'Comfortaa', cursive" }}>{member}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="hover:text-accent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground border-3 border-primary hover:shadow-[4px_4px_0_rgba(196,30,58,1)] transition-all rounded-lg"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ДОБАВИТЬ
              </button>
            </form>

            {/* Teams List */}
            <div className="space-y-3">
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Одобренные команды ({approvedTeams.length})
              </h3>
              {approvedTeams.map((team) => (
                <div
                  key={team.id}
                  className="border-2 border-primary bg-muted/30 p-3 rounded-lg"
                >
                  <h4 className="mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                    {team.name}
                  </h4>
                  <p className="text-sm opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
                    {team.members.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Criteria Setup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-2 border-accent rounded-lg">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                КРИТЕРИИ
              </h2>
            </div>

            <form onSubmit={handleAddCriterion} className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Comfortaa', cursive" }}>
                  Название критерия
                </label>
                <input
                  type="text"
                  value={criterionName}
                  onChange={(e) => setCriterionName(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                  placeholder="Например: Крутость идеи"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm" style={{ fontFamily: "'Comfortaa', cursive" }}>
                    Вес (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                    placeholder="0.25"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm" style={{ fontFamily: "'Comfortaa', cursive" }}>
                    Макс. балл
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                    placeholder="10"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-accent-foreground border-3 border-accent hover:shadow-[4px_4px_0_rgba(220,20,60,1)] transition-all rounded-lg"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ДОБАВИТЬ
              </button>
            </form>

            {/* Criteria List */}
            <div className="space-y-3">
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Критерии ({criteria.length})
              </h3>
              {criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="border-2 border-primary bg-muted/30 p-3 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      {criterion.name}
                    </h4>
                    <div className="bg-accent text-accent-foreground px-3 py-1 text-xs border-2 border-accent rounded-full">
                      {(criterion.weight * 100).toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-sm opacity-70" style={{ fontFamily: "'Comfortaa', cursive" }}>
                    Максимум: {criterion.maxScore} баллов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Chat channel="admin" userName="Админ" />
      </motion.div>
    </div>
  );
}