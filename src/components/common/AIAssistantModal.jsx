import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  X,
  Send,
  User,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const QUICK_PROMPTS = [
  { label: "🌾 Wheat Bio-Fertilizers", text: "What is the best bio-fertilizer schedule for Wheat?" },
  { label: "🌱 Paddy Blast Solution", text: "How to treat leaf blast and sheath blight in Paddy?" },
  { label: "☁️ Cotton Bollworm Control", text: "What organic bio-pesticide works best for Cotton bollworms?" },
  { label: "💧 Bio-NPK Dosage Guide", text: "Explain dosage and application method for Bio-NPK Liquid Consortia." },
];

export const AIAssistantModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      sender: "ai",
      text: "Namaste! 🙏 I am your **BioNature Gemini AI Agronomist**.\n\nAsk me anything about organic farming, crop diseases, bio-fertilizers, or product dosages. How can I help your farm today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: history,
          language,
        }),
      });

      const data = await res.json();
      const aiReply =
        data.success && data.data?.reply
          ? data.data.reply
          : "I am ready to assist with your crop. Please try asking again or connect with our agronomists on WhatsApp.";

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        source: data.data?.source || "gemini",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I'm having trouble connecting to the agronomy server. Please ensure our helpline is contacted at +91 956 6753 333.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-6 z-40 flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 bg-[#183F26] hover:bg-[#245B35] text-white px-4 py-3 rounded-full shadow-lg transition-colors border border-[#245B35]"
            aria-label="Open Gemini AI Agronomist"
          >
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E7EBDD]" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              Ask AI Agronomist
            </span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#245B35]"></span>
            </span>
          </button>
        )}
      </div>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[640px] h-[85vh] bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#183F26] text-white p-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#E7EBDD]">
                <Sparkles className="w-5 h-5 text-[#E7EBDD]" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  BioNature Gemini AI
                  <Badge className="bg-white/15 text-[#E7EBDD] text-[10px] font-semibold border-none px-1.5 py-0.2">
                    Live
                  </Badge>
                </h3>
                <p className="text-[11px] text-stone-300">
                  Digital Organic Agronomist Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors text-[#E7EBDD]"
                title="Toggle Language"
              >
                {language === "en" ? "हिन्दी" : "English"}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 overflow-x-auto flex gap-2 no-scrollbar">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.text)}
                className="text-[11px] font-medium bg-white hover:bg-[#F1F3EC] text-slate-700 hover:text-[#245B35] px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap shadow-2xs transition-colors shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "ai" && (
                  <div className="w-7 h-7 rounded-xl bg-[#245B35] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-xs ${
                    m.sender === "user"
                      ? "bg-[#245B35] text-white rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs leading-relaxed"
                  }`}
                >
                  <div className="whitespace-pre-line text-xs">{m.text}</div>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === "user" ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2">
                <Bot className="w-4 h-4 text-[#245B35] animate-spin" />
                <span>Gemini AI is analyzing agricultural recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === "hi" ? "फसल या खाद के बारे में पूछें..." : "Ask about crops, pests, bio-fertilizers..."}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-[#245B35]"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="bg-[#245B35] hover:bg-[#183F26] text-white rounded-xl px-3 h-8.5"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
