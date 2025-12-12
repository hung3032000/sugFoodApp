"use client";
import React, { useState } from 'react';
import { Copy, Users, Link2, ArrowRight, UserPlus, Check } from 'lucide-react';
import { Screen, Restaurant } from '../../app/page';
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export default function RoomScreen() {
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [joinCode, setJoinCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [participants, setParticipants] = useState<string[]>(['You']);
  const router = useRouter();

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    // onRoomCode(code);
    return code;
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateRoomCode();
    setGeneratedCode(code);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    // onRoomCode(joinCode);
    router.push(`/voting/${joinCode}`);
  };

  const handleCopyCode = () => {
    const shareUrl = `https://clteater.com/room/${generatedCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartVoting = () => {
    router.push(`/voting/${generatedCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green via-primary-green-dark to-primary-orange p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Group Voting</h1>
          <p className="text-white/90">Create or join a room to vote with your team</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Mode Selector */}
          <div className="flex gap-2 mb-6 bg-neutral-100 rounded-full p-1">
            <button
              onClick={() => setMode('create')}
              className={`flex-1 py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                mode === 'create'
                  ? 'bg-white shadow-md text-primary-orange'
                  : 'text-neutral-600'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Create Room
            </button>
            <button
              onClick={() => setMode('join')}
              className={`flex-1 py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                mode === 'join'
                  ? 'bg-white shadow-md text-primary-orange'
                  : 'text-neutral-600'
              }`}
            >
              <Link2 className="w-4 h-4" />
              Join Room
            </button>
          </div>

          {mode === 'create' ? (
            <div>
              {!generatedCode ? (
                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-neutral-700">
                      Room Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Team Lunch - Dec 12"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-4">
                    <h5 className="mb-2">Group Settings</h5>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-neutral-700">Everyone can suggest restaurants</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-neutral-300 text-primary-orange focus:ring-primary-orange" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-neutral-700">Anonymous voting</span>
                        <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-orange focus:ring-primary-orange" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-neutral-700">Auto-close after 30 minutes</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-neutral-300 text-primary-orange focus:ring-primary-orange" />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-orange to-primary-green text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Create Room
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="mb-2">Room Created!</h4>
                    <p className="text-neutral-600">Share this code with your team</p>
                  </div>

                  <div className="bg-gradient-to-br from-primary-orange to-primary-green p-6 rounded-2xl text-center">
                    <p className="text-white/80 text-sm mb-2">Room Code</p>
                    <div className="text-5xl tracking-widest text-white mb-4">
                      {generatedCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center justify-center gap-2 mx-auto px-6 py-2 bg-white text-primary-orange rounded-full hover:shadow-md transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5>Participants</h5>
                      <div className="flex items-center gap-1 text-sm text-neutral-600">
                        <Users className="w-4 h-4" />
                        <span>{participants.length}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {participants.map((participant, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-white text-sm">
                            {participant[0]}
                          </div>
                          <span className="text-sm">{participant}</span>
                          {index === 0 && (
                            <span className="ml-auto text-xs bg-primary-green text-white px-2 py-1 rounded-full">
                              Host
                            </span>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-3 text-neutral-400">
                        <div className="w-8 h-8 border-2 border-dashed border-neutral-300 rounded-full flex items-center justify-center">
                          <UserPlus className="w-4 h-4" />
                        </div>
                        <span className="text-sm">Waiting for others...</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStartVoting}
                    className="w-full bg-gradient-to-r from-primary-orange to-primary-green text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Start Voting
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-neutral-700">
                  Enter Room Code
                </label>
                <input
                  type="text"
                  placeholder="ABC123"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent text-center text-2xl tracking-widest uppercase"
                  maxLength={6}
                  required
                />
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Ask your host to share the room code or link
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-orange to-primary-green text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Join Room
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => redirect('/home')}
            className="text-white hover:text-white/80 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
