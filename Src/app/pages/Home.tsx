import { Link } from "react-router";
import { Shield, Award, Users, BarChart3, Zap, Star } from "lucide-react";
import { motion } from "motion/react";
import VintageStamp from "../components/VintageStamp";

export default function Home() {
  const roles = [
    {
      icon: Shield,
      title: "АДМИНИСТРАТОР",
      description: "Добавляйте команды и настраивайте критерии оценки",
      link: "/admin",
      color: "bg-primary",
    },
    {
      icon: Award,
      title: "ЖЮРИ",
      description: "Ставьте оценки командам по критериям",
      link: "/jury",
      color: "bg-accent",
    },
    {
      icon: Users,
      title: "УЧАСТНИК",
      description: "Смотрите оценки и статистику вашей команды",
      link: "/team",
      color: "bg-muted-foreground",
    },
    {
      icon: BarChart3,
      title: "РЕЗУЛЬТАТЫ",
      description: "Таблица лидеров и графики",
      link: "/leaderboard",
      color: "bg-secondary",
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
        {/* Decorative stamps */}
        <div className="absolute -top-4 -left-4 hidden lg:block">
          <VintageStamp rotation={-15}>
            <Star className="w-6 h-6" />
          </VintageStamp>
        </div>
        <div className="absolute -top-4 -right-4 hidden lg:block">
          <VintageStamp rotation={12}>
            <Zap className="w-6 h-6" />
          </VintageStamp>
        </div>

        <div className="inline-block border-4 border-black p-8 bg-card shadow-[8px_8px_0_rgba(0,0,0,1)] mb-6">
          <h2 
            className="text-4xl sm:text-6xl mb-4"
            style={{ fontFamily: "'Rubik Mono One', cursive" }}
          >
            ЧЕСТНАЯ ОЦЕНКА
          </h2>
          <p 
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            Автоматический подсчет баллов за секунду.
            <br />
            Никаких ошибок. Никакого обмана.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-2 w-24 bg-accent transform -rotate-2" />
          <p className="text-sm tracking-widest uppercase opacity-70">
            Выберите свою роль
          </p>
          <div className="h-2 w-24 bg-accent transform rotate-2" />
        </div>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
              <div className="border-4 border-black bg-card p-6 transition-all hover:shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1">
                <div className={`${role.color} w-16 h-16 flex items-center justify-center mb-4 border-2 border-black`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {role.title}
                </h3>
                <p 
                  className="text-sm opacity-80"
                  style={{ fontFamily: "'Special Elite', cursive" }}
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
        className="border-4 border-black bg-accent/10 p-8"
      >
        <h3 
          className="text-2xl mb-6 text-center"
          style={{ fontFamily: "'Rubik Mono One', cursive" }}
        >
          ГЛАВНЫЕ ФИШКИ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h4 className="mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Всё автоматически
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Special Elite', cursive" }}>
              Баллы считаются сами, в реальном времени
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h4 className="mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Прверяется всё без ошибок
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Special Elite', cursive" }}>
              Никто не может накосячить или сжульничать
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <h4 className="mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Красивые графики
            </h4>
            <p className="text-sm opacity-80" style={{ fontFamily: "'Special Elite', cursive" }}>
              Результаты видно с первого взгляда
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quote in Tsoi style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 text-center"
      >
   
      </motion.div>
    </div>
  );
}