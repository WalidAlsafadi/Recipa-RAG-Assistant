"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, AlertCircle, Copy, Check, Search, ArrowRight, StopCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL, SUGGESTED_QUESTIONS } from "@/lib/constants";

type HistoryEntry = { question: string; answer: string; };

export default function QAEngine() {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- PERSISTENCE ---
  useEffect(() => {
    const saved = localStorage.getItem("recipa-history");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error("Failed to load history", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipa-history", JSON.stringify(history));
  }, [history]);

  const clearHistory = () => {
    setHistory([]);
    setCurrentAnswer("");
    localStorage.removeItem("recipa-history");
    toast({ title: "History Cleared" });
  };

  const handleCopy = async () => {
    if (!currentAnswer) return;
    try {
      await navigator.clipboard.writeText(currentAnswer);
      setIsCopied(true);
      toast({ title: "Copied", className: "bg-white border-orange-200 text-orange-900" });
      setTimeout(() => setIsCopied(false), 2000);
    } catch { toast({ title: "Failed to copy", variant: "destructive" }); }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      toast({ title: "Stopped", description: "Generation stopped by user." });
    }
  };

  const handleSubmit = async (e?: FormEvent, manualQuestion?: string) => {
    if (e) e.preventDefault();
    const queryText = manualQuestion || question;
    if (!queryText.trim()) { setError("Please enter a question"); return; }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError("");
    setCurrentAnswer("");
    setIsCopied(false);

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: queryText.trim(), k: 3, history: history.slice(-3) }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      if (!response.body) throw new Error("Streaming not supported.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        fullText += chunk;
        setCurrentAnswer(fullText);
      }
      setQuestion("");
      setHistory((prev) => [...prev, { question: queryText.trim(), answer: fullText }].slice(-10));
    } catch (err: any) {
      if (err.name !== 'AbortError') setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <section 
      id="qa-section" 
      // Background set to white
      className="min-h-screen flex flex-col justify-center py-20 bg-white border-b border-gray-200 transition-colors relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Ask Recipa<span className="text-orange-600">AI</span>
          </h2>
          {/* Underline removed per design request */}
          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              RecipaAI may make mistakes.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          {/* Card background is white */}
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
            <div className="h-3 bg-orange-500 w-full" />
            <CardContent className="p-6 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  {/* TEXTAREA MODIFIED: Changed to white background (bg-white) and black text (text-black) */}
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
                    placeholder="Enter ingredients or recipe query..."
                    className="min-h-[160px] text-xl p-6 rounded-xl bg-white text-black placeholder:text-gray-600 border-2 border-gray-400 focus-visible:border-orange-500 focus-visible:ring-0"
                    disabled={isLoading}
                  />
                  {/* ICON CONTAINER MODIFIED: Adjusted colors for white background contrast */}
                  <div className="absolute bottom-4 right-4 p-2 bg-gray-100 rounded-lg text-gray-600 hidden sm:block border border-gray-300">
                    <Search className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setQuestion(s); handleSubmit(undefined, s); }}
                      className="text-sm font-bold bg-white text-gray-600 px-4 py-2 rounded-lg hover:text-orange-700 hover:bg-orange-50 border border-gray-200 hover:border-orange-400 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-50 border-red-200">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading || !question.trim()} className="flex-1 h-20 text-xl font-bold rounded-xl bg-gray-900 hover:bg-black text-white">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : <><span className="mr-2">Generate</span> <ArrowRight /></>}
                  </Button>
                  {isLoading && (
                    <Button type="button" onClick={handleStop} variant="destructive" className="h-20 w-20 rounded-xl">
                      <StopCircle className="h-8 w-8" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* LOADING SKELETON */}
          {isLoading && !currentAnswer && (
             <div className="space-y-4 p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
                <Skeleton className="h-12 w-3/4 bg-orange-100/50" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
             </div>
          )}

          {currentAnswer && (
            <Card id="answer-panel" className="bg-white shadow-lg rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 border border-gray-200">
              <CardHeader className="bg-white border-b border-gray-100 flex flex-row justify-between items-center py-6 px-10">
                <CardTitle className="text-2xl font-bold">Generated Result</CardTitle>
                <div className="flex gap-2">
                   <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                     <Trash2 className="h-4 w-4 mr-2"/> Clear
                   </Button>
                   <Button variant="outline" size="sm" onClick={handleCopy}>
                     {isCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                     {isCopied ? "Saved" : "Copy"}
                   </Button>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                {/* Removed dark mode setting for prose */}
                <div className="prose prose-lg prose-slate max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-lg border border-gray-200"><table className="w-full text-left text-sm" {...props} /></div>,
                      thead: ({node, ...props}) => <thead className="bg-orange-50 text-orange-900 uppercase font-bold" {...props} />,
                      th: ({node, ...props}) => <th className="px-6 py-4" {...props} />,
                      td: ({node, ...props}) => <td className="px-6 py-4 border-t border-gray-100" {...props} />,
                      li: ({node, ...props}) => <li className="my-2" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-orange-700 font-bold" {...props} />
                    }}
                  >
                    {currentAnswer}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}