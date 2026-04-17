import { motion } from "motion/react";
import { MessageSquare, Users, AlertCircle } from "lucide-react";
import Chat from "../components/Chat";
import { useHackathon } from "../contexts/HackathonContext";

export default function ModeratorPanel() {
  const { teams } = useHackathon();

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
          ПАНЕЛЬ МОДЕРАТОРА
        </h1>
        <p
          className="text-lg opacity-70 mt-4"
          style={{ fontFamily: "'Comfortaa', cursive" }}
        >
          Следите за чатами и помогайте участникам
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="border-4 border-primary bg-card p-6 shadow-[6px_6px_0_rgba(196,30,58,1)] rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-2 border-primary rounded-lg">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                СТАТИСТИКА
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/20 border-2 border-secondary p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    Всего команд
                  </span>
                  <span
                    className="text-3xl text-primary"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {teams.length}
                  </span>
                </div>
              </div>

              <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    Одобренные
                  </span>
                  <span
                    className="text-3xl text-primary"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {teams.filter(t => t.status === "approved").length}
                  </span>
                </div>
              </div>

              <div className="bg-accent/10 border-2 border-accent p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    На рассмотрении
                  </span>
                  <span
                    className="text-3xl text-accent"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {teams.filter(t => t.status === "pending").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-4 border-accent bg-accent/10 p-6 shadow-[6px_6px_0_rgba(220,20,60,1)] rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-2 border-accent rounded-lg">
                <AlertCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2
                className="text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ИНСТРУКЦИЯ
              </h2>
            </div>

            <div
              className="space-y-3 text-sm"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              <p className="bg-card border-2 border-primary p-3 rounded-lg">
                📝 <strong>Отвечайте на вопросы</strong> участников в чатах
              </p>
              <p className="bg-card border-2 border-primary p-3 rounded-lg">
                👀 <strong>Следите за порядком</strong> в общении
              </p>
              <p className="bg-card border-2 border-primary p-3 rounded-lg">
                💬 <strong>Публикуйте важную информацию</strong> для всех участников
              </p>
              <p className="bg-card border-2 border-primary p-3 rounded-lg">
                🤝 <strong>Помогайте командам</strong> с организационными вопросами
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Chat channel="moderator" userName="Модератор" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Chat channel="participants" userName="Модератор" />
        </motion.div>
      </div>
    </div>
  );
}
