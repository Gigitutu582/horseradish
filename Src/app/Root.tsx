import { Outlet } from "react-router";
import Header from "./components/Header";
import { HackathonProvider } from "./contexts/HackathonContext";

export default function Root() {
  return (
    <HackathonProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Newspaper texture overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-10 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Grunge border effect */}
        <div className="fixed top-0 left-0 right-0 h-3 bg-gradient-to-b from-black/20 to-transparent z-10" />
        <div className="fixed bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        <Header />
        
        <main className="relative z-0">
          <Outlet />
        </main>
      </div>
    </HackathonProvider>
  );
}