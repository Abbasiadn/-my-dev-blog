// components/ChatWidget.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Minus,
  Maximize2,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    type: "bot",
    text: "Hi there! I'm your blog assistant. I can help you find articles, suggest topics, or answer questions about the content here.",
    timestamp: new Date(),
    suggestions: [
      "Latest articles",
      "Most popular topics",
      "Search by category",
      "About this blog",
    ],
  },
];

const blogKnowledge: Record<string, string> = {
  "latest articles":
    "I'd recommend checking out our latest posts on frontend architecture and design systems.",
  "most popular topics":
    "Our readers love articles about React patterns, design systems, and developer workflow.",
  "search by category":
    "You can browse by categories like React, Next.js, UI/UX Design, Tailwind CSS, and Web Security.",
  "about this blog":
    "This blog focuses on code, design, and the craft of building software.",
  react:
    "We have several in-depth React articles covering hooks, component patterns, and performance.",
  "next.js":
    "Our Next.js articles cover App Router, server components, and full-stack patterns.",
  design:
    "Design systems and UI/UX are core topics here. Start with our design systems articles.",
  tailwind:
    "We cover Tailwind CSS extensively, including theming and responsive design.",
  security:
    "Web security articles focus on best practices and secure coding patterns.",
  contact: "You can reach the author through the Contact page.",
  subscribe: "Subscribe to get one thoughtful essay each week.",
  help: "I can help you find articles or explore topics. Try asking about 'latest articles' or 'categories'.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Detect mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [isOpen, isMinimized]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && !isMinimized && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMinimized, isMobile]);

  const generateResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase();

    for (const [keyword, response] of Object.entries(blogKnowledge)) {
      if (normalizedInput.includes(keyword)) {
        return response;
      }
    }

    if (normalizedInput.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! Great to see you. I can help you find interesting articles or explore topics.";
    }

    if (normalizedInput.includes("thank")) {
      return "You're very welcome! Is there anything else you'd like to explore?";
    }

    return "I'm still learning! You can ask me about 'latest articles', 'categories', or specific topics like React or design systems.";
  };

  const getSuggestions = (input: string): string[] => {
    const normalizedInput = input.toLowerCase();

    if (normalizedInput.includes("latest")) {
      return ["Most popular topics", "Search by category", "About this blog"];
    }
    if (normalizedInput.includes("categor")) {
      return ["React articles", "Design systems", "Web security"];
    }

    return ["Latest articles", "Most popular topics", "Search by category"];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const suggestions = getSuggestions(inputValue);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: botResponse,
        timestamp: new Date(),
        suggestions: suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Use setTimeout to ensure state is updated
    setTimeout(() => {
      handleSendMessageWithText(suggestion);
    }, 100);
  };

  const handleSendMessageWithText = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(text);
      const suggestions = getSuggestions(text);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: botResponse,
        timestamp: new Date(),
        suggestions: suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && !isMinimized && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Widget Container */}
      <div
        className="fixed z-[70]"
        style={{
          bottom: "env(safe-area-inset-bottom, 16px)",
          right: "16px",
          left: isMobile && isOpen && !isMinimized ? "16px" : "auto",
          top: isMobile && isOpen && !isMinimized ? "16px" : "auto",
        }}
      >
        <AnimatePresence>
          {isOpen && !isMinimized && (
            <motion.div
              ref={chatWindowRef}
              initial={{ opacity: 0, y: 20, scale: isMobile ? 1 : 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: isMobile ? 1 : 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                bg-ivory rounded-card border border-ink/10 shadow-modal overflow-hidden
                flex flex-col
                ${isMobile ? "w-full h-full" : "w-[380px] md:w-[400px] max-h-[80vh]"}
              `}
              style={{
                height: isMobile ? "100%" : "auto",
                maxHeight: isMobile ? "100dvh" : "min(600px, 80dvh)",
              }}
            >
              {/* Header */}
              <div className="bg-lavender p-3 sm:p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ivory flex items-center justify-center relative shrink-0">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-lavender-deep" />
                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-ink leading-tight">
                      Blog Assistant
                    </h3>
                    <p className="text-[10px] sm:text-xs text-ink/70">
                      Here to help you explore
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!isMobile && (
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-2 text-ink/70 hover:text-ink transition-colors"
                      aria-label="Minimize chat"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsMinimized(false);
                    }}
                    className="p-2 text-ink/70 hover:text-ink transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-cream/50"
                style={{
                  minHeight: 0,
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.type === "user"
                          ? "bg-ink text-ivory rounded-t-card rounded-bl-card"
                          : "bg-ivory text-ink rounded-t-card rounded-br-card border border-ink/10"
                      } p-2.5 px-3 sm:p-3 sm:px-4`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "bot" && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-lavender/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-lavender-deep" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm leading-relaxed break-words">
                            {message.text}
                          </p>
                          <span className="text-[9px] sm:text-[10px] opacity-60 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message.type === "user" && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-lavender/20 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-lavender-deep" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-ivory text-ink rounded-t-card rounded-br-card border border-ink/10 p-3 px-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-lavender-deep rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-lavender-deep rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 bg-lavender-deep rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages[messages.length - 1]?.suggestions && !isTyping && (
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-ink/10 bg-ivory shrink-0">
                  <p className="text-[10px] sm:text-xs text-ink-faint mb-1.5 sm:mb-2">
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {messages[messages.length - 1].suggestions?.map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-lavender/20 text-lavender-deep hover:bg-lavender/30 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-ink/10 bg-ivory shrink-0">
                <div className="flex gap-2 sm:gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about articles, topics..."
                    className="flex-1 min-w-0 bg-cream border border-ink/10 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-lavender transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-ink text-ivory flex items-center justify-center hover:bg-lavender-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Bar (Desktop only) */}
        <AnimatePresence>
          {isOpen && isMinimized && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 right-0 w-[320px]"
            >
              <button
                onClick={() => setIsMinimized(false)}
                className="w-full bg-lavender text-ink rounded-card px-4 py-3 flex items-center justify-between shadow-modal hover:bg-lavender-deep hover:text-ivory transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="font-serif text-sm font-semibold">
                    Blog Assistant
                  </span>
                </span>
                <Maximize2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-lavender text-ink shadow-modal flex items-center justify-center hover:bg-lavender-deep hover:text-ivory transition-colors relative"
          style={{ marginLeft: "auto" }}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-gold" />
        </motion.button>
      </div>
    </>
  );
}
