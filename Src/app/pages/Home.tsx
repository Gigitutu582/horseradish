import { Link } from "react-router";
import { Shield, Award, Users, BarChart3, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const roles = [
    {
      icon: Shield,
      title: "АДМИН",
      description: "Добавляет команды и настраивает критерии оценки",
      link: "/admin",
      color: "bg-primary",
    },
    {
      icon: Award,
      title: "ЖЮРИ",
      description: "Ставит оценки командам по критериям",
      link: "/jury",
      color: "bg-accent",
    },
    {
      icon: MessageSquare,
      title: "МОДЕРАТОР",
      description: "Следит за чатами и помогайт участникам",
      link: "/moderator",
      color: "bg-secondary",
    },
    {
      icon: Users,
      title: "УЧАСТНИК",
      description: "Смотрит оценки и статистику команды",
      link: "/team",
      color: "bg-muted-foreground",
    },
    {
      icon: BarChart3,
      title: "РЕЗУЛЬТАТЫ",
      description: "Таблица лидеров",
      link: "/leaderboard",
      color: "bg-primary",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute -top-8 -left-8 hidden lg:block">
          <Sparkles className="w-16 h-16 text-secondary opacity-30 animate-pulse" />
        </div>
        <div className="absolute -top-8 -right-8 hidden lg:block">
          <Sparkles className="w-16 h-16 text-accent opacity-30 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="inline-block border-4 border-primary p-8 bg-gradient-to-br from-card to-secondary/10 shadow-[12px_12px_0_rgba(196,30,58,0.3)] mb-6 rounded-2xl">
          <h2
            className="text-4xl sm:text-6xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            ЧЕСТНАЯ ОЦЕНКА
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            Автоматический подсчет баллов за секунду.
            <br />
            Никаких ошибок. Никакого обмана.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent to-accent rounded-full" />
          <p
            className="text-sm tracking-widest uppercase opacity-70"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Выберите свою роль
          </p>
          <div className="h-1 w-24 bg-gradient-to-l from-transparent to-accent rounded-full" />
        </div>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {roles.map((role, index) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={role.link}
              className="block group"
            >
              <div className="border-4 border-primary bg-card p-6 transition-all hover:shadow-[8px_8px_0_rgba(196,30,58,1)] hover:-translate-y-2 rounded-xl">
                <div className={`${role.color} w-16 h-16 flex items-center justify-center mb-4 border-2 border-primary rounded-lg group-hover:scale-110 transition-transform`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {role.title}
                </h3>
                <p
                  className="text-sm opacity-80"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                >
                  {role.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-4 border-primary bg-gradient-to-br from-accent/10 to-secondary/10 p-8 rounded-2xl shadow-[8px_8px_0_rgba(196,30,58,0.2)]"
      >
        <h3
          className="text-2xl mb-6 text-center text-primary"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          ГЛАВНЫЕ ФИШКИ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-card/50 p-6 rounded-xl border-2 border-secondary/30">
            <div className="text-4xl mb-2">⚡</div>
            <h4 className="mb-2" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Всё автоматически
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Comfortaa', cursive" }}>
              Баллы считаются сами, в реальном времени
            </p>
          </div>
          <div className="text-center bg-card/50 p-6 rounded-xl border-2 border-secondary/30">
            <div className="text-4xl mb-2">🎯</div>
            <h4 className="mb-2" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Проверяется всё без ошибок
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Comfortaa', cursive" }}>
              Никто не может накосячить или сжульничать
            </p>
          </div>
          <div className="text-center bg-card/50 p-6 rounded-xl border-2 border-secondary/30">
            <div className="text-4xl mb-2">💬</div>
            <h4 className="mb-2" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Чаты для всех
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Comfortaa', cursive" }}>
              Общайтесь с админами, жюри и участниками
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}