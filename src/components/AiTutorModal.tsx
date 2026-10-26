import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight,
  RefreshCw,
  Clock,
  BookOpen
} from 'lucide-react';
import { ChatMessage, StudentProfile } from '../types';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudent?: StudentProfile | null;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  selectedStudent
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: `Hello ${selectedStudent ? selectedStudent.name : 'learner'}! I'm your interactive AI tutor. Let's work through linear equations together step-by-step. Remember: I will give you helpful clues and guiding questions instead of just blurting out the answer! What problem shall we tackle?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          currentConcept: 'Linear Equations and Inverse Operations',
          problemContext: 'Solving 2x + 4 = 10 without falling into sign reversal errors'
        })
      });

      const data = await response.json();
      const replyText = data.reply || "Let's take a look at the variable x. What number is being added to it, and how can we cancel it?";

      setMessages(prev => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          sender: 'tutor',
          text: replyText,
          timestamp: 'Just now'
        }
      ]);
    } catch (err) {
      console.error('Tutor chat failed:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          sender: 'tutor',
          text: "Think about inverse operations: to remove +4 from the left side, what inverse operation must you perform on both sides?",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "I got x = 7 for 2x + 4 = 10, why is that wrong?",
    "How do I clear a fraction coefficient like 2/3?",
    "Give me a gentle hint for isolating terms with brackets 3(m - 2) = 15."
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Tutor Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-400 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Socrates-AI Learning Assistant</h3>
                <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded-full font-semibold">
                  Scaffolding Mode
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Guiding {selectedStudent ? selectedStudent.name : 'students'} with step-by-step questions, not instant answers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'tutor' && (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  U
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-10">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              Socrates-AI is crafting a guiding question...
            </div>
          )}
        </div>

        {/* Quick Question Prompts */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 flex-shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Scenarios:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-[11px] whitespace-nowrap transition-colors border border-slate-200 cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question or current step..."
            className="flex-1 px-4 py-2.5 text-sm bg-slate-100 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
