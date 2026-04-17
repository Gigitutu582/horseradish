import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Team {
  id: string;
  name: string;
  members: string[];
  totalScore: number;
  status: "pending" | "approved" | "rejected";
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
}

export interface Score {
  teamId: string;
  criterionId: string;
  juryId: string;
  score: number;
}

export interface ChatMessage {
  id: string;
  channel: "admin" | "jury" | "participants" | "moderator";
  sender: string;
  message: string;
  timestamp: Date;
}

interface HackathonContextType {
  teams: Team[];
  criteria: Criterion[];
  scores: Score[];
  currentJury: string;
  chatMessages: ChatMessage[];
  addTeam: (team: Omit<Team, "id" | "totalScore" | "status">) => void;
  addCriterion: (criterion: Omit<Criterion, "id">) => void;
  addScore: (score: Omit<Score, "juryId">) => void;
  setCurrentJury: (juryId: string) => void;
  calculateScores: () => void;
  approveTeam: (teamId: string) => void;
  rejectTeam: (teamId: string) => void;
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
}

const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

export function HackathonProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "Code Warriors", members: ["Алексей", "Мария", "Дмитрий"], totalScore: 0, status: "approved" },
    { id: "2", name: "Hack Rebels", members: ["Ирина", "Сергей"], totalScore: 0, status: "approved" },
    { id: "3", name: "Digital Punks", members: ["Ольга", "Николай", "Елена", "Павел"], totalScore: 0, status: "pending" },
  ]);

  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: "1", name: "Инновационность", weight: 0.3, maxScore: 10 },
    { id: "2", name: "Техническая реализация", weight: 0.25, maxScore: 10 },
    { id: "3", name: "Презентация", weight: 0.2, maxScore: 10 },
    { id: "4", name: "Практическая польза", weight: 0.25, maxScore: 10 },
  ]);

  const [scores, setScores] = useState<Score[]>([]);
  const [currentJury, setCurrentJury] = useState<string>("jury1");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", channel: "admin", sender: "Система", message: "Добро пожаловать в админский чат!", timestamp: new Date() },
    { id: "2", channel: "jury", sender: "Система", message: "Добро пожаловать в чат жюри!", timestamp: new Date() },
    { id: "3", channel: "participants", sender: "Система", message: "Добро пожаловать в чат участников!", timestamp: new Date() },
  ]);

  const addTeam = (team: Omit<Team, "id" | "totalScore" | "status">) => {
    const newTeam: Team = {
      ...team,
      id: Date.now().toString(),
      totalScore: 0,
      status: "pending",
    };
    setTeams((prev) => [...prev, newTeam]);
  };

  const approveTeam = (teamId: string) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, status: "approved" as const } : team))
    );
  };

  const rejectTeam = (teamId: string) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, status: "rejected" as const } : team))
    );
  };

  const addChatMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const addCriterion = (criterion: Omit<Criterion, "id">) => {
    const newCriterion: Criterion = {
      ...criterion,
      id: Date.now().toString(),
    };
    setCriteria((prev) => [...prev, newCriterion]);
  };

  const addScore = (score: Omit<Score, "juryId">) => {
    const newScore: Score = {
      ...score,
      juryId: currentJury,
    };
    
    // Remove existing score for this team/criterion/jury if exists
    setScores((prev) => {
      const filtered = prev.filter(
        (s) =>
          !(s.teamId === newScore.teamId &&
            s.criterionId === newScore.criterionId &&
            s.juryId === newScore.juryId)
      );
      return [...filtered, newScore];
    });
  };

  const calculateScores = useCallback(() => {
    setTeams((prevTeams) => 
      prevTeams.map((team) => {
        let totalScore = 0;

        criteria.forEach((criterion) => {
          // Get all scores for this team and criterion from different jury members
          const teamCriterionScores = scores.filter(
            (s) => s.teamId === team.id && s.criterionId === criterion.id
          );

          if (teamCriterionScores.length > 0) {
            // Calculate average score for this criterion
            const avgScore =
              teamCriterionScores.reduce((sum, s) => sum + s.score, 0) /
              teamCriterionScores.length;

            // Apply weight
            totalScore += avgScore * criterion.weight;
          }
        });

        return { ...team, totalScore };
      })
    );
  }, [criteria, scores]);

  return (
    <HackathonContext.Provider
      value={{
        teams,
        criteria,
        scores,
        currentJury,
        chatMessages,
        addTeam,
        addCriterion,
        addScore,
        setCurrentJury,
        calculateScores,
        approveTeam,
        rejectTeam,
        addChatMessage,
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}

export function useHackathon() {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error("useHackathon must be used within HackathonProvider");
  }
  return context;
}