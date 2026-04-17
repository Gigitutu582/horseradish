import { useState } from "react";
import { useHackathon, ChatMessage } from "../contexts/HackathonContext";
import { Send, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface ChatProps {
  channel: "admin" | "jury" | "participants" | "moderator";
  userName: string;
}

export default function Chat({ channel, userName }: ChatProps) {
  const { chatMessages, addChatMessage } = useHackathon();
  const [message, setMessage] = useState("");

  const channelMessages = chatMessages.filter((msg) => msg.channel === channel);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addChatMessage({
        channel,
        sender: userName,
        message: message.trim(),
      });
      setMessage("");
    }
  };

  const channelTitles = {
    admin: "ЧАТ АДМИНОВ",
    jury: "ЧАТ ЖЮРИ",
    participants: "ЧАТ УЧАСТНИКОВ",
    moderator: "ЧАТ МОДЕРАТОРОВ",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-4 border-primary bg-card shadow-[8px_8px_0_rgba(196,30,58,1)] h-full flex flex-col"
    >
      <div className="bg-primary text-primary-foreground p-4 border-b-4 border-primary">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          <h3
            className="text-xl"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            {channelTitles[channel]}
          </h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[500px]">
        {channelMessages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-muted/50 border-2 border-secondary p-3 rounded-lg"
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="font-bold text-primary"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {msg.sender}
              </span>
              <span className="text-xs opacity-60">
                {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p
              className="text-sm"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              {msg.message}
            </p>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t-4 border-primary bg-muted/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Написать сообщение..."
            className="flex-1 px-4 py-3 border-3 border-primary bg-input-background focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-accent-foreground border-3 border-primary hover:shadow-[4px_4px_0_rgba(196,30,58,1)] transition-all rounded-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
