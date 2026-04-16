import { useState } from "react";
import { useHackathon } from "../contexts/HackathonContext";
import { Plus, X, Users as UsersIcon, Target } from "lucide-react";
import { motion } from "motion/react";

export default function AdminPanel() {
  const { teams, criteria, addTeam, addCriterion } = useHackathon();
  
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
          АДМИНКА
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Registration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="border-4 border-black bg-card p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-2 border-black">
                <UsersIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 
                className="text-2xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ДОБАВИТЬ КОМАНДУ
              </h2>
            </div>

            <form onSubmit={handleAddTeam} className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Special Elite', cursive" }}>
                  Название команды
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Крутые Программисты"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Special Elite', cursive" }}>
                  Участники
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMember())}
                    className="flex-1 px-4 py-2 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Имя участника"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="px-4 py-2 bg-accent text-accent-foreground border-2 border-black hover:shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {members.map((member) => (
                    <div
                      key={member}
                      className="flex items-center gap-2 px-3 py-1 bg-muted border-2 border-black text-sm"
                    >
                      <span style={{ fontFamily: "'Special Elite', cursive" }}>{member}</span>
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
                className="w-full px-6 py-3 bg-primary text-primary-foreground border-2 border-black hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ДОБАВИТЬ
              </button>
            </form>

            {/* Teams List */}
            <div className="space-y-3">
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Команды ({teams.length})
              </h3>
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="border-2 border-black bg-muted/30 p-3"
                >
                  <h4 className="mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {team.name}
                  </h4>
                  <p className="text-sm opacity-70" style={{ fontFamily: "'Special Elite', cursive" }}>
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
          <div className="border-4 border-black bg-card p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-2 border-black">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 
                className="text-2xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                КРИТЕРИИ
              </h2>
            </div>

            <form onSubmit={handleAddCriterion} className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm" style={{ fontFamily: "'Special Elite', cursive" }}>
                  Название критерия
                </label>
                <input
                  type="text"
                  value={criterionName}
                  onChange={(e) => setCriterionName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Например: Крутость идеи"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm" style={{ fontFamily: "'Special Elite', cursive" }}>
                    Мин. балл (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0.25"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm" style={{ fontFamily: "'Special Elite', cursive" }}>
                    Макс. балл
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black bg-input-background focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-accent-foreground border-2 border-black hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ДОБАВИТЬ
              </button>
            </form>

            {/* Criteria List */}
            <div className="space-y-3">
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Критерии ({criteria.length})
              </h3>
              {criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="border-2 border-black bg-muted/30 p-3"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {criterion.name}
                    </h4>
                    <div className="bg-accent text-accent-foreground px-2 py-1 text-xs border border-black">
                      {(criterion.weight * 100).toFixed(0)}%
                    </div>
                  </div>
                  <p className="text-sm opacity-70" style={{ fontFamily: "'Special Elite', cursive" }}>
                    Максимум: {criterion.maxScore} баллов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}