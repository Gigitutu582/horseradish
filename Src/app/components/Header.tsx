import { Link, useLocation } from "react-router";
import { Trophy, Users, Award, BarChart3 } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="relative border-b-4 border-black py-6 px-4 sm:px-8 bg-card shadow-[0_4px_0_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 
            className="text-5xl sm:text-7xl tracking-tighter mb-2"
            style={{ fontFamily: "'Rubik Mono One', cursive" }}
          >
            ФИКСИКАТОР
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-accent" />
            <p 
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Special Elite', cursive" }}
            >
              Система оценки хакатона
            </p>
            <div className="h-1 w-12 bg-accent" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`
              px-4 py-2 border-2 border-black transition-all
              ${isActive("/") 
                ? "bg-accent text-accent-foreground shadow-[3px_3px_0_rgba(0,0,0,1)]" 
                : "bg-card hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }
            `}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              ГЛАВНАЯ
            </span>
          </Link>

          <Link
            to="/admin"
            className={`
              px-4 py-2 border-2 border-black transition-all
              ${isActive("/admin") 
                ? "bg-accent text-accent-foreground shadow-[3px_3px_0_rgba(0,0,0,1)]" 
                : "bg-card hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }
            `}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              АДМИН
            </span>
          </Link>

          <Link
            to="/jury"
            className={`
              px-4 py-2 border-2 border-black transition-all
              ${isActive("/jury") 
                ? "bg-accent text-accent-foreground shadow-[3px_3px_0_rgba(0,0,0,1)]" 
                : "bg-card hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }
            `}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              ЖЮРИ
            </span>
          </Link>

          <Link
            to="/leaderboard"
            className={`
              px-4 py-2 border-2 border-black transition-all
              ${isActive("/leaderboard") 
                ? "bg-accent text-accent-foreground shadow-[3px_3px_0_rgba(0,0,0,1)]" 
                : "bg-card hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }
            `}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              РЕЗУЛЬТАТЫ
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}