"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Clock, Crown, ThumbsUp, Info } from 'lucide-react';
import { Screen, Restaurant } from '../../app/page';
import Image from "next/image";
import { redirect } from "next/navigation";

interface VotingOption {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  votes: number;
  voters: string[];
  priceRange: string;
  distance: string;
}

export default function VotingScreen() {
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [myVote, setMyVote] = useState<string | null>(null);
  const [options, setOptions] = useState<VotingOption[]>([
    {
      id: '1',
      name: 'Golden Dragon',
      cuisine: 'Asian Fusion',
      image: 'https://images.unsplash.com/photo-1600470944938-b301e41001c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGFzaWFufGVufDF8fHx8MTc2NTUyNDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      votes: 3,
      voters: ['Alice', 'Bob', 'Charlie'],
      priceRange: '$$',
      distance: '0.3 mi'
    },
    {
      id: '2',
      name: 'Taco Street',
      cuisine: 'Mexican',
      image: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NTQyODYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      votes: 5,
      voters: ['Dana', 'Eve', 'Frank', 'Grace', 'Henry'],
      priceRange: '$',
      distance: '0.5 mi'
    },
    {
      id: '3',
      name: 'The Burger Joint',
      cuisine: 'American',
      image: 'https://images.unsplash.com/photo-1699874371811-5484a9970441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbWVyaWNhbiUyMGZvb2R8ZW58MXx8fHwxNzY1NDI4NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      votes: 2,
      voters: ['Ivy', 'Jack'],
      priceRange: '$$',
      distance: '0.4 mi'
    },
    {
      id: '4',
      name: 'Fresh Bowl',
      cuisine: 'Healthy',
      image: 'https://images.unsplash.com/photo-1578657084274-03b9d153b0dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2NTQ3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      votes: 1,
      voters: ['Kelly'],
      priceRange: '$$',
      distance: '0.6 mi'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVote = (optionId: string) => {
    if (myVote === optionId) {
      // Unvote
      setMyVote(null);
      setOptions(options.map(opt => 
        opt.id === optionId 
          ? { ...opt, votes: opt.votes - 1, voters: opt.voters.filter(v => v !== 'You') }
          : opt
      ));
    } else {
      // Vote or change vote
      const newOptions = options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1, voters: [...opt.voters, 'You'] };
        } else if (opt.id === myVote) {
          return { ...opt, votes: opt.votes - 1, voters: opt.voters.filter(v => v !== 'You') };
        }
        return opt;
      });
      setOptions(newOptions);
      setMyVote(optionId);
    }
  };

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
  const winner = sortedOptions[0];

  const handleConfirmChoice = () => {
    redirect("/room");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => redirect("/room")}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1">
              <h4>Group Voting</h4>
              <p className="text-xs text-neutral-500">Room: 
                {/* {roomCode} */}
                
                </p>
            </div>
            <div className="w-10"></div>
          </div>

          {/* Timer & Participants Bar */}
          <div className="flex items-center justify-between bg-neutral-50 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-green" />
              <div>
                <p className="text-sm">11 participants</p>
                <p className="text-xs text-neutral-500">{totalVotes} votes cast</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-orange" />
              <div className="text-right">
                <p className="text-sm">{formatTime(timeRemaining)}</p>
                <p className="text-xs text-neutral-500">remaining</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Current Leader */}
        <div className="bg-gradient-to-r from-primary-orange to-primary-green rounded-2xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-6 h-6" />
            <h4 className="text-white">Current Winner</h4>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={winner.image}
              alt={winner.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-white mb-1">{winner.name}</h3>
              <p className="text-white/90 text-sm">{winner.cuisine} • {winner.priceRange}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">{winner.votes}</div>
              <p className="text-xs text-white/80">votes</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>How it works:</strong> Vote for your favorite option. You can change your vote anytime before the timer ends. The option with the most votes wins!
            </p>
          </div>
        </div>

        {/* Voting Options */}
        <h4 className="mb-4">Vote for Your Favorite</h4>
        <div className="space-y-3">
          {sortedOptions.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isMyVote = myVote === option.id;
            
            return (
              <div
                key={option.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all ${
                  isMyVote ? 'ring-2 ring-primary-orange shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      <span>#{index + 1}</span>
                    </div>

                    {/* Restaurant Image */}
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="mb-1">{option.name}</h5>
                      <p className="text-sm text-neutral-600">
                        {option.cuisine} • {option.priceRange} • {option.distance}
                      </p>
                    </div>

                    {/* Vote Button & Count */}
                    <div className="text-right flex-shrink-0">
                      <button
                        onClick={() => handleVote(option.id)}
                        className={`mb-2 px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                          isMyVote
                            ? 'bg-primary-orange text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isMyVote ? 'fill-white' : ''}`} />
                        <span className="text-sm">{isMyVote ? 'Voted' : 'Vote'}</span>
                      </button>
                      <p className="text-sm text-neutral-600">{option.votes} votes</p>
                    </div>
                  </div>

                  {/* Vote Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          index === 0 ? 'bg-primary-orange' : 'bg-neutral-300'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-neutral-500">
                        {option.voters.slice(0, 3).join(', ')}
                        {option.voters.length > 3 && ` +${option.voters.length - 3} more`}
                      </p>
                      <p className="text-xs text-neutral-500">{percentage.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add More Option */}
        <button className="w-full mt-4 py-4 border-2 border-dashed border-neutral-300 rounded-2xl text-neutral-500 hover:border-primary-orange hover:text-primary-orange transition-all">
          + Suggest Another Restaurant
        </button>

        {/* Confirm Button */}
        {myVote && (
          <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4 rounded-2xl shadow-lg mt-6 mb-6">
            <button
              onClick={handleConfirmChoice}
              className="w-full bg-gradient-to-r from-primary-orange to-primary-green text-white py-4 rounded-full hover:shadow-lg transition-all"
            >
              Confirm & Proceed to Winner
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
