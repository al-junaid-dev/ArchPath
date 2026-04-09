'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, ArrowRight, CheckCircle2, Compass, Brain, Sparkles, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Define the shape of our JSON data
interface RoadmapStep {
  phase: string;
  duration: string;
  focus: string;
  actionItems: string[];
}

interface RoadmapData {
  title: string;
  overview: string;
  steps: RoadmapStep[];
}

// Emotion Matrix Component
const AiAvatar = ({ emotion, isTyping }: { emotion?: string, isTyping?: boolean }) => {
  if (isTyping) {
    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.2)]">
        <Brain className="w-4 h-4 text-indigo-500 animate-pulse" />
      </div>
    );
  }

  switch (emotion) {
    case 'celebrating':
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all duration-500">
          <Sparkles className="w-4 h-4 text-emerald-500" />
        </div>
      );
    case 'empathetic':
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all duration-500">
          <Lightbulb className="w-4 h-4 text-amber-500" />
        </div>
      );
    case 'analyzing':
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-500">
          <Brain className="w-4 h-4 text-cyan-600" />
        </div>
      );
    default: // neutral
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center transition-all duration-500">
          <Compass className="w-4 h-4 text-zinc-600" />
        </div>
      );
  }
};

export default function GeneratorPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{role: string, content: string, emotion?: string}[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadUserAndProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
      else router.replace('/dashboard');
      setLoading(false);
    }
    loadUserAndProfile();
  }, [router, supabase]);

  const generatePath = async () => {
    setGenerating(true);
    setRoadmap(null);
    setChatMessages([]); 

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldOfStudy: profile.field_of_study,
          classLevel: profile.class_level,
          interests: profile.interests?.join(', ') || 'general technology',
        }),
      });

      const data = await response.json();
      
      if (data.roadmap) {
        setRoadmap(data.roadmap);
      } else {
        alert("Something went wrong generating the roadmap.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the AI engine.");
    } finally {
      setGenerating(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = { role: 'user', content: currentMessage };
    const updatedMessages = [...chatMessages, userMessage];
    
    setChatMessages(updatedMessages);
    setCurrentMessage('');
    setIsChatting(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Strip out the custom 'emotion' tag before sending the history to Groq
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
          profile: profile,
          roadmap: roadmap 
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        setChatMessages([...updatedMessages, { 
          role: 'assistant', 
          content: data.message,
          emotion: data.emotion 
        }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsChatting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-pulse text-zinc-500 font-medium">Checking profile data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <NavBar />
      
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section - Hides once the roadmap is generated */}
          {!roadmap && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-zinc-200 shadow-sm max-w-4xl mx-auto">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Compass className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Target Domain</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                  {profile?.field_of_study}
                </h1>
                <p className="text-zinc-500 text-sm mt-1">Level: {profile?.class_level}</p>
              </div>
              <Button 
                onClick={generatePath} 
                disabled={generating}
                size="lg"
                className="bg-black text-white hover:bg-zinc-800 transition-all"
              >
                {generating ? 'Architecting Roadmap...' : 'Generate Roadmap'}
                {!generating && <Map className="ml-2 w-5 h-5" />}
              </Button>
            </div>
          )}

          {/* Loading State */}
          {generating && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 max-w-4xl mx-auto">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
              <p className="text-zinc-500 animate-pulse font-medium">
                Analyzing industry trends & structuring your path...
              </p>
            </div>
          )}

          {/* Generated Content Area */}
          {roadmap && !generating && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* NEW: Centered Course Title */}
              <div className="text-center pt-4 pb-8 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
                  <Compass className="w-4 h-4" />
                  <span>Your Architectural Path</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 capitalize"><p className=" text-sm">f o r</p>
                  {profile?.field_of_study}
                </h2>
              </div>

              {/* The Split Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* LEFT COLUMN: The Roadmap */}
                <div className="lg:col-span-2 space-y-8">
                  
                  <div className="text-left space-y-2 mb-8 bg-white/60 p-6 rounded-xl border border-zinc-200/50">
                    <h2 className="text-2xl font-bold text-zinc-900">{roadmap.title}</h2>
                    <p className="text-zinc-500">{roadmap.overview}</p>
                  </div>

                  <div className="relative border-l-2 border-zinc-200 ml-4 md:ml-6 space-y-12 pb-8">
                    {roadmap.steps.map((step, index) => (
                      <div key={index} className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[17px] top-2 h-8 w-8 rounded-full bg-black border-4 border-zinc-50 flex items-center justify-center text-sm text-white font-bold shadow-sm">
                          {index + 1}
                        </div>

                        <Card className="border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3 border-b border-zinc-100 bg-white/50">
                            <div className="flex justify-between items-start flex-col md:flex-row md:items-center gap-2">
                              <CardTitle className="text-xl text-zinc-900">{step.phase}</CardTitle>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                                {step.duration}
                              </span>
                            </div>
                            <CardDescription className="text-zinc-600 font-medium mt-2">
                              Focus: {step.focus}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4 bg-white">
                            <h4 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center uppercase tracking-wider">
                              <ArrowRight className="w-4 h-4 mr-2 text-zinc-400" /> Key Action Items
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {step.actionItems.map((item, i) => (
                                <li key={i} className="flex items-start text-zinc-600 text-sm">
                                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: The Chat Box */}
                <div className="lg:col-span-1 lg:sticky lg:top-24">
                  <Card className="border-zinc-200 shadow-md bg-white/80 backdrop-blur-sm flex flex-col h-[600px]">
                    <CardHeader className="border-b border-zinc-100 pb-4">
                      <CardTitle className="text-xl">Ask your Architect</CardTitle>
                      <CardDescription>Need course links or clarification? Just ask.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col flex-grow overflow-hidden">
                      
                      {/* Chat Messages Area */}
                      <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-zinc-50/50">
                        {chatMessages.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-zinc-400 text-sm text-center px-4">
                            Start a conversation about your new roadmap...
                          </div>
                        ) : (
                          chatMessages.map((msg, index) => (
                            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              
                              {/* AI Avatar displays on the left for assistant messages */}
                              {msg.role === 'assistant' && <AiAvatar emotion={msg.emotion} />}

                              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                                msg.role === 'user' 
                                  ? 'bg-black text-white rounded-br-none shadow-md' 
                                  : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-sm'
                              }`}>
                                {msg.role === 'user' ? (
                                  msg.content
                                ) : (
                                  <article className="prose prose-sm prose-zinc max-w-none leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-pre:bg-zinc-100 prose-pre:text-zinc-800">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                  </article>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                        
                        {/* Typing Indicator */}
                        {isChatting && (
                          <div className="flex gap-3 justify-start items-center">
                            <AiAvatar isTyping={true} />
                            <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-zinc-500 flex gap-1 shadow-sm">
                              <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chat Input Area */}
                      <div className="p-4 bg-white border-t border-zinc-100">
                        <form onSubmit={sendMessage} className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="e.g., Free YouTube courses for Phase 1?"
                            className="w-full px-4 py-2 bg-zinc-100 border-transparent rounded-lg focus:bg-white focus:border-zinc-300 focus:ring-0 outline-none transition-all text-sm"
                            disabled={isChatting}
                          />
                          <Button type="submit" disabled={isChatting || !currentMessage.trim()} className="bg-black text-white w-full">
                            Send
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}