import ReactMarkdown from "react-markdown";
import { useState } from "react";
import api from "../services/api";

type Props = {
  paperId: number;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox({ paperId }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/chat/", {
        paper_id: paperId,
        question,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: question,
        },
        {
          role: "assistant",
          content: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="mt-8">

      {/* CHAT HEADER */}
      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
          🤖
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Ask ResearchOS AI
          </h2>

          <p className="text-sm text-gray-500">
            Ask questions about this research paper
          </p>
        </div>

      </div>

      {/* INPUT AREA */}
      <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-4">

        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              askQuestion();
            }
          }}
          placeholder="Ask anything about this paper..."
          className="w-full bg-transparent text-white placeholder-gray-600 outline-none resize-none text-sm leading-6"
        />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">

          <p className="text-xs text-gray-600">
            Press Enter to ask • Shift + Enter for a new line
          </p>

          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            {loading ? "Thinking..." : "Ask AI →"}
          </button>

        </div>

      </div>

      {/* THINKING STATE */}
      {loading && (
        <div className="flex items-center gap-3 mt-5 text-gray-400 text-sm">

          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </div>

          ResearchOS AI is thinking...

        </div>
      )}

      {/* CHAT MESSAGES */}
      <div className="mt-6 flex flex-col gap-5">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-2xl px-5 py-4 border ${
                message.role === "user"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-[#111827] border-gray-800 text-gray-200"
              }`}
            >

              {/* MESSAGE HEADER */}
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold">

                <span>
                  {message.role === "user"
                    ? "👤"
                    : "🤖"}
                </span>

                <span>
                  {message.role === "user"
                    ? "You"
                    : "ResearchOS AI"}
                </span>

              </div>

              {/* MESSAGE CONTENT */}
              <div
                className={`leading-7 text-sm ${
                  message.role === "assistant"
                    ? "comparison-content"
                    : ""
                }`}
              >
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}