import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, User, Bot, Map, List, TrendingUp, Star, X, Send, SlidersHorizontal, DollarSign, Navigation2, Heart, History, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Screen, Restaurant } from '../../app/page';
import Image from "next/image";
interface HomeScreenProps {
  onNavigate: (screen: Screen, restaurant?: Restaurant) => void;
  onGroupModeChange: (isGroup: boolean) => void;
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Golden Dragon',
    cuisine: 'Asian Fusion',
    priceRange: '$$',
    rating: 4.5,
    distance: '0.3 mi',
    hours: 'Open until 9:00 PM',
    address: '123 Main St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1600470944938-b301e41001c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGFzaWFufGVufDF8fHx8MTc2NTUyNDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 42,
    description: 'Modern Asian cuisine with a creative twist',
    menuItems: ['Pad Thai', 'Ramen Bowl', 'Sushi Roll', 'Dumplings'],
    reviews: 128
  },
  {
    id: '2',
    name: 'Taco Street',
    cuisine: 'Mexican',
    priceRange: '$',
    rating: 4.7,
    distance: '0.5 mi',
    hours: 'Open until 10:00 PM',
    address: '456 Trade St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NTQyODYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 56,
    description: 'Authentic street tacos and fresh ingredients',
    menuItems: ['Street Tacos', 'Burrito Bowl', 'Quesadillas', 'Nachos'],
    reviews: 203
  },
  {
    id: '3',
    name: 'Bella Italia',
    cuisine: 'Italian',
    priceRange: '$$$',
    rating: 4.3,
    distance: '0.7 mi',
    hours: 'Open until 11:00 PM',
    address: '789 Tryon St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1628169822580-ca53b886cdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBwaXp6YXxlbnwxfHx8fDE3NjU0MzQ3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 31,
    description: 'Traditional Italian recipes passed down generations',
    menuItems: ['Margherita Pizza', 'Carbonara', 'Lasagna', 'Tiramisu'],
    reviews: 95
  },
  {
    id: '4',
    name: 'The Burger Joint',
    cuisine: 'American',
    priceRange: '$$',
    rating: 4.6,
    distance: '0.4 mi',
    hours: 'Open until 10:00 PM',
    address: '321 College St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1699874371811-5484a9970441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbWVyaWNhbiUyMGZvb2R8ZW58MXx8fHwxNzY1NDI4NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 48,
    description: 'Gourmet burgers and craft beers',
    menuItems: ['Classic Burger', 'BBQ Bacon Burger', 'Veggie Burger', 'Loaded Fries'],
    reviews: 167
  },
  {
    id: '5',
    name: 'Fresh Bowl',
    cuisine: 'Healthy',
    priceRange: '$$',
    rating: 4.4,
    distance: '0.6 mi',
    hours: 'Open until 8:00 PM',
    address: '555 Graham St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1578657084274-03b9d153b0dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2NTQ3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 29,
    description: 'Fresh salads and grain bowls made to order',
    menuItems: ['Buddha Bowl', 'Caesar Salad', 'Poke Bowl', 'Smoothie'],
    reviews: 89
  },
  {
    id: '6',
    name: 'Street Eats',
    cuisine: 'Street Food',
    priceRange: '$',
    rating: 4.8,
    distance: '0.2 mi',
    hours: 'Open until 7:00 PM',
    address: '100 5th St, Charlotte, NC',
    image: 'https://images.unsplash.com/photo-1648470820025-f014bc01f9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwdmVuZG9yfGVufDF8fHx8MTc2NTUxOTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pickCount: 67,
    description: 'Local street food favorites',
    menuItems: ['Banh Mi', 'Falafel Wrap', 'Korean BBQ', 'Spring Rolls'],
    reviews: 234
  }
];

export default function HomeScreen({ onNavigate, onGroupModeChange }: HomeScreenProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; text: string; reason?: string }>>([
    { role: 'ai', text: '👋 Hi! I can help you find the perfect meal. What are you craving today?' }
  ]);
  const [aiRecommendations, setAiRecommendations] = useState<Restaurant[]>([]);
  const [filterCuisine, setFilterCuisine] = useState('all');
  const [vietnameseRegion, setVietnameseRegion] = useState('all');
  const [dishType, setDishType] = useState('all');
  const [priceRange, setPriceRange] = useState<string[]>(['$', '$$', '$$$']);
  const [distanceRange, setDistanceRange] = useState(5);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['1', '6']); // Mock favorite restaurant IDs
  const [showProfile, setShowProfile] = useState(false);

  const handleModeSelect = (mode: 'solo' | 'group') => {
    if (mode === 'group') {
      onGroupModeChange(true);
      onNavigate('room');
    } else {
      onGroupModeChange(false);
    }
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    onNavigate('detail', restaurant);
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const userMessage = aiMessage.trim();
    setAiMessages([...aiMessages, { role: 'user', text: userMessage }]);
    setAiMessage('');

    // AI Analysis Logic - Mock NLP keyword detection
    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let recommendations: Restaurant[] = [];
      let responseText = '';
      let contextReason = '';

      // Mood-based logic
      if (lowerMsg.includes('sad') || lowerMsg.includes('down') || lowerMsg.includes('upset')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'American' || r.cuisine === 'Italian');
        responseText = '🍕 Here\'s some comfort food for when you\'re feeling down!';
        contextReason = 'Comfort foods like burgers and pasta can help lift your spirits.';
      }
      // Stress-based
      else if (lowerMsg.includes('stress') || lowerMsg.includes('busy') || lowerMsg.includes('tired')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$' || r.distance.includes('0.2'));
        responseText = '⚡ Quick and easy options to reduce your stress!';
        contextReason = 'Close, affordable spots so you can eat quickly and get back to relaxing.';
      }
      // Just got paid / celebration
      else if (lowerMsg.includes('paid') || lowerMsg.includes('celebrate') || lowerMsg.includes('party')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$$$' || r.rating >= 4.5);
        responseText = '🥳 Time to celebrate! Here are premium dining options!';
        contextReason = 'You deserve to treat yourself to something special!';
      }
      // Weather - Raining
      else if (lowerMsg.includes('rain') || lowerMsg.includes('cold') || lowerMsg.includes('weather')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Asian Fusion' || r.cuisine === 'Vietnamese');
        responseText = '🌧️ Perfect warm meals for rainy weather!';
        contextReason = 'Hot soups and Asian comfort food are ideal for rainy days.';
      }
      // Healthy options
      else if (lowerMsg.includes('health') || lowerMsg.includes('diet') || lowerMsg.includes('light')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Healthy');
        responseText = '🥗 Fresh and healthy choices for you!';
        contextReason = 'Light, nutritious meals to keep you energized and feeling great.';
      }
      // Budget / Cheap
      else if (lowerMsg.includes('budget') || lowerMsg.includes('cheap') || lowerMsg.includes('save') || lowerMsg.includes('affordable')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$');
        responseText = '💸 Budget-friendly options that don\'t skimp on taste!';
        contextReason = 'Delicious meals that won\'t break the bank.';
      }
      // Date night / romantic
      else if (lowerMsg.includes('date') || lowerMsg.includes('romantic') || lowerMsg.includes('special')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$$$' || r.cuisine === 'Italian');
        responseText = '👩‍❤️‍👨 Romantic dining spots perfect for a special evening!';
        contextReason = 'Ambiance and quality cuisine for an unforgettable date.';
      }
      // Group gathering
      else if (lowerMsg.includes('group') || lowerMsg.includes('friends') || lowerMsg.includes('team')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Mexican' || r.cuisine === 'American');
        responseText = '🍻 Great spots for group gatherings!';
        contextReason = 'Shareable portions and lively atmosphere for hanging out.';
      }
      // Quick lunch
      else if (lowerMsg.includes('quick') || lowerMsg.includes('fast') || lowerMsg.includes('hurry')) {
        recommendations = mockRestaurants.filter(r => r.distance.includes('0.2') || r.distance.includes('0.3'));
        responseText = '⚡ Fast and nearby options for a quick lunch!';
        contextReason = 'Close locations with speedy service to fit your schedule.';
      }
      // Default
      else {
        recommendations = [mockRestaurants[0], mockRestaurants[1], mockRestaurants[5]];
        responseText = '🍽️ Here are some top recommendations based on your preferences!';
        contextReason = 'Popular choices that our users love.';
      }

      setAiRecommendations(recommendations);
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        text: responseText,
        reason: contextReason
      }]);
    }, 800);
  };

  const handleSuggestionChip = (chipLabel: string, keywords: string) => {
    setAiMessages([...aiMessages, { role: 'user', text: chipLabel }]);

    // Process the chip selection using the same AI logic
    setTimeout(() => {
      const lowerKeywords = keywords.toLowerCase();
      let recommendations: Restaurant[] = [];
      let responseText = '';
      let contextReason = '';

      if (keywords.includes('sad')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'American' || r.cuisine === 'Italian');
        responseText = '🍕 Here\'s some comfort food to cheer you up!';
        contextReason = 'Comfort foods like burgers and pasta can help lift your spirits.';
      } else if (keywords.includes('paid')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$$$' || r.rating >= 4.5);
        responseText = '🥳 Treat yourself! Here are premium dining options!';
        contextReason = 'You deserve to celebrate with something special!';
      } else if (keywords.includes('stress')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$' || r.distance.includes('0.2'));
        responseText = '😌 Let\'s reduce that stress with easy, nearby options!';
        contextReason = 'Quick, affordable meals so you can relax sooner.';
      } else if (keywords.includes('rain')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Asian Fusion');
        responseText = '🌧️ Warm comfort food perfect for rainy weather!';
        contextReason = 'This spicy noodle soup is perfect for a rainy day like today!';
      } else if (keywords.includes('health')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Healthy');
        responseText = '🥗 Fresh and nutritious options for your healthy lifestyle!';
        contextReason = 'Light meals packed with nutrients to keep you energized.';
      } else if (keywords.includes('budget')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$');
        responseText = '💸 Delicious food without breaking the bank!';
        contextReason = 'End-of-month friendly options that still taste amazing.';
      } else if (keywords.includes('date')) {
        recommendations = mockRestaurants.filter(r => r.priceRange === '$$$' || r.cuisine === 'Italian');
        responseText = '👩‍❤️‍👨 Perfect romantic spots for your date night!';
        contextReason = 'Intimate atmosphere and exceptional cuisine for a special evening.';
      } else if (keywords.includes('group')) {
        recommendations = mockRestaurants.filter(r => r.cuisine === 'Mexican' || r.cuisine === 'American');
        responseText = '🍻 Ideal places for group gatherings!';
        contextReason = 'Great for sharing food and good times with friends.';
      } else if (keywords.includes('quick')) {
        recommendations = mockRestaurants.filter(r => r.distance.includes('0.2') || r.distance.includes('0.3'));
        responseText = '⚡ Super quick options nearby!';
        contextReason = 'Fast service and close proximity for your busy schedule.';
      }

      setAiRecommendations(recommendations);
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        text: responseText,
        reason: contextReason
      }]);
    }, 800);
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = filterCuisine === 'all' || restaurant.cuisine === filterCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-green rounded-full flex items-center justify-center">
                <span className="text-white">CE</span>
              </div>
              <div>
                <h3 className="text-primary-orange">CLT Eater</h3>
                <p className="text-xs text-neutral-500">CLV Company</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAI(!showAI)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
              >
                <Bot className="w-6 h-6 text-primary-green" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-orange rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
          </div>

          {/* AI Food Assistant Button */}
          <button
            onClick={() => setShowAI(!showAI)}
            className="w-full bg-white border-2 border-primary-orange rounded-2xl p-4 mb-4 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-primary-orange" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="text-neutral-900">AI Food Assistant</h5>
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">Beta</span>
                </div>
                <p className="text-xs text-neutral-600">Not sure what to eat? Let our AI help you decide based on your preferences and mood!</p>
              </div>
              <div className="flex-shrink-0">
                {showAI ? (
                  <div className="w-6 h-6 text-neutral-400">▼</div>
                ) : (
                  <div className="w-6 h-6 text-neutral-400">▶</div>
                )}
              </div>
            </div>
          </button>

          {/* Mode Selector & View Toggle */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleModeSelect('solo')}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-primary-orange hover:text-white rounded-full transition-all"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Solo</span>
              </button>
              <button
                onClick={() => handleModeSelect('group')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-orange to-primary-green text-white rounded-full hover:shadow-md transition-all"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm">Group</span>
              </button>
            </div>
            
            <div className="flex gap-2">
              <div className="flex bg-neutral-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'map' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter & Sort Bar */}
          <div className="bg-neutral-50 rounded-2xl p-3 space-y-3">
            {/* Sort Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'rating'
                    ? 'bg-primary-orange text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Rating
                </div>
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'price'
                    ? 'bg-primary-orange text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Price
                </div>
              </button>
              <button
                onClick={() => setSortBy('distance')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'distance'
                    ? 'bg-primary-orange text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Navigation2 className="w-3 h-3" />
                  Distance
                </div>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="ml-auto px-3 py-1.5 bg-primary-green text-white rounded-full text-sm hover:bg-primary-green-dark transition-all flex items-center gap-1"
              >
                <SlidersHorizontal className="w-3 h-3" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-white rounded-xl p-4 space-y-4">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Cuisine Type</label>
                  <select
                    value={filterCuisine}
                    onChange={(e) => setFilterCuisine(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
                  >
                    <option value="all">All Cuisines</option>
                    <option value="Korean">Korean</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Thai">Thai</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Indian">Indian</option>
                    <option value="Western">Western</option>
                    <option value="Street Food">Street Food</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="American">American</option>
                  </select>

                  {/* Vietnamese Region Sub-filter */}
                  {filterCuisine === 'Vietnamese' && (
                    <div className="mt-2">
                      <label className="block text-xs text-neutral-600 mb-2">Vietnamese Region</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setVietnameseRegion('all')}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            vietnameseRegion === 'all'
                              ? 'bg-primary-green text-white'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setVietnameseRegion('north')}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            vietnameseRegion === 'north'
                              ? 'bg-primary-green text-white'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          North
                        </button>
                        <button
                          onClick={() => setVietnameseRegion('middle')}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            vietnameseRegion === 'middle'
                              ? 'bg-primary-green text-white'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          Middle
                        </button>
                        <button
                          onClick={() => setVietnameseRegion('south')}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            vietnameseRegion === 'south'
                              ? 'bg-primary-green text-white'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          South
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dish Type Filter */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Dish Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDishType('all')}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        dishType === 'all'
                          ? 'bg-primary-orange text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setDishType('dry')}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        dishType === 'dry'
                          ? 'bg-primary-orange text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      Dry Dishes
                    </button>
                    <button
                      onClick={() => setDishType('soup')}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        dishType === 'soup'
                          ? 'bg-primary-orange text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      Soup Dishes
                    </button>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    {['$', '$$', '$$$'].map((price) => (
                      <button
                        key={price}
                        onClick={() => {
                          if (priceRange.includes(price)) {
                            setPriceRange(priceRange.filter(p => p !== price));
                          } else {
                            setPriceRange([...priceRange, price]);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          priceRange.includes(price)
                            ? 'bg-primary-green text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Distance Slider */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">
                    Distance: {distanceRange >= 5 ? '5+ km' : `${distanceRange} km`}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={distanceRange}
                    onChange={(e) => setDistanceRange(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-orange"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>1 km</span>
                    <span>2 km</span>
                    <span>3 km</span>
                    <span>4 km</span>
                    <span>5+ km</span>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={() => {
                    setFilterCuisine('all');
                    setVietnameseRegion('all');
                    setDishType('all');
                    setPriceRange(['$', '$$', '$$$']);
                    setDistanceRange(5);
                  }}
                  className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-neutral-200 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Daily Spotlight Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary-orange" />
            <h4>Today&apos;s Spotlight</h4>
          </div>
          <div className="bg-gradient-to-br from-primary-orange via-primary-green to-primary-orange p-6 rounded-2xl shadow-lg text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2">🏆 Top Pick Today</div>
                <h3 className="text-white mb-2">Street Eats</h3>
                <p className="text-white/90 mb-3 text-sm">Local street food favorites with authentic flavors. Perfect for a quick, delicious lunch!</p>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm">⭐ 4.8 Rating</span>
                  <span className="text-sm">📍 0.2 mi</span>
                  <span className="text-sm">💰 $</span>
                </div>
                <button 
                  onClick={() => handleRestaurantClick(mockRestaurants[5])}
                  className="bg-white text-primary-orange px-6 py-2 rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative h-48 md:h-auto">
                <Image 
                  src={mockRestaurants[5].image} 
                  alt="Street Eats"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Based on What You Ate Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-5 h-5 text-primary-green" />
            <h4>Based on What You Ate</h4>
            <span className="text-xs text-neutral-500">(You frequently ordered Asian & Mexican)</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockRestaurants.filter(r => r.cuisine === 'Asian Fusion' || r.cuisine === 'Mexican').map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-40">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs">
                    ⭐ {restaurant.rating}
                  </div>
                  <div className="absolute top-2 left-2 bg-primary-green text-white px-2 py-1 rounded-full text-xs">
                    Recommended
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="mb-1">{restaurant.name}</h5>
                  <p className="text-xs text-neutral-600 mb-2">{restaurant.cuisine} • {restaurant.priceRange} • {restaurant.distance}</p>
                  <p className="text-xs text-neutral-500 italic">&quot;Because you loved similar places!&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Favorites Section */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h4>Your Favorites</h4>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {mockRestaurants.filter(r => favorites.includes(r.id)).map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant)}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 border-red-100"
                >
                  <div className="relative h-40">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs">
                      ⭐ {restaurant.rating}
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full">
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h5 className="mb-1">{restaurant.name}</h5>
                    <p className="text-xs text-neutral-600 mb-2">{restaurant.cuisine} • {restaurant.priceRange} • {restaurant.distance}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span className="text-xs text-neutral-500">Last visited 3 days ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Reviews Banner */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h5 className="text-amber-900 mb-1">Pending Reviews</h5>
              <p className="text-sm text-amber-700 mb-3">You have 2 meals to rate! Help others find great food.</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm hover:bg-amber-600 transition-colors">
                  Rate Golden Dragon
                </button>
                <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm hover:bg-amber-600 transition-colors">
                  Rate Taco Street
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Restaurants Header */}
        <div className="flex items-center justify-between mb-4">
          <h4>All Restaurants</h4>
          <span className="text-sm text-neutral-500">{filteredRestaurants.length} results</span>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary-orange" />
              <span className="text-xs text-neutral-500">Trending</span>
            </div>
            <p className="text-sm">Street Eats</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-primary-green" />
              <span className="text-xs text-neutral-500">Top Rated</span>
            </div>
            <p className="text-sm">Taco Street</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-neutral-600" />
              <span className="text-xs text-neutral-500">Closest</span>
            </div>
            <p className="text-sm">Street Eats</p>
          </div>
        </div>

        {/* Restaurant List */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
                    ⭐ {restaurant.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-primary-orange/90 text-white px-3 py-1 rounded-full text-xs">
                    {restaurant.pickCount} picks
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="mb-1">{restaurant.name}</h4>
                  <p className="text-sm text-neutral-600 mb-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <span>{restaurant.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl h-[600px] shadow-sm overflow-hidden">
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">Map View</p>
                <p className="text-sm text-neutral-400 mt-2">Google Maps integration would display here</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Assistant Panel - Inline Expanded */}
      {showAI && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-orange overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-orange/10 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-orange" />
                  </div>
                  <div>
                    <h5 className="text-neutral-900">AI Food Assistant</h5>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAI(false)}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Suggestion Chips - Removed label, just chips */}
            <div className="p-4 border-b border-neutral-100 bg-neutral-50">
              <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSuggestionChip('😔 Feeling Sad', 'sad')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                😔 Feeling Sad
              </button>
              <button
                onClick={() => handleSuggestionChip('🥳 Just got paid', 'paid')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                🥳 Just got paid
              </button>
              <button
                onClick={() => handleSuggestionChip('🤯 Stressed out', 'stress')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                🤯 Stressed out
              </button>
              <button
                onClick={() => handleSuggestionChip('🌧️ It\'s raining', 'rain')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                🌧️ It&apos;s raining
              </button>
              <button
                onClick={() => handleSuggestionChip('🥗 Healthy Options', 'health')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                🥗 Healthy Options
              </button>
              <button
                onClick={() => handleSuggestionChip('💸 On a Budget', 'budget')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                💸 On a Budget
              </button>
              <button
                onClick={() => handleSuggestionChip('👩‍❤️‍👨 Date Night', 'date')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                👩‍❤️‍👨 Date Night
              </button>
              <button
                onClick={() => handleSuggestionChip('🍻 Group Gathering', 'group')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                🍻 Group Gathering
              </button>
              <button
                onClick={() => handleSuggestionChip('⚡ Quick Lunch', 'quick')}
                className="px-3 py-1.5 bg-white text-neutral-700 rounded-full text-xs hover:bg-neutral-100 transition-colors border border-neutral-200 shadow-sm"
              >
                ⚡ Quick Lunch
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto bg-white">
            {aiMessages.map((message, index) => (
              <div key={index} className="mb-4">
                {message.role === 'ai' ? (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-orange" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-neutral-100 rounded-2xl rounded-tl-none p-3">
                        <p className="text-sm text-neutral-800">{message.text}</p>
                        {message.reason && (
                          <p className="text-xs text-neutral-600 mt-2 italic">💡 {message.reason}</p>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 ml-1">
                        {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </p>

                      {/* Show recommendation cards after AI messages */}
                      {index === aiMessages.length - 1 && aiRecommendations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {aiRecommendations.map((restaurant) => (
                            <div
                              key={restaurant.id}
                              onClick={() => {
                                handleRestaurantClick(restaurant);
                                setShowAI(false);
                              }}
                              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-200"
                            >
                              <div className="flex gap-3 p-3">
                                <Image
                                  src={restaurant.image}
                                  alt={restaurant.name}
                                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-sm mb-1 truncate">{restaurant.name}</h5>
                                  <p className="text-xs text-neutral-600 mb-1">{restaurant.cuisine}</p>
                                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <span>⭐ {restaurant.rating}</span>
                                    <span>•</span>
                                    <span>{restaurant.priceRange}</span>
                                    <span>•</span>
                                    <span>📍 {restaurant.distance}</span>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0 self-center" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-primary-orange text-white rounded-2xl rounded-tr-none p-3 max-w-[70%]">
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleAISubmit} className="p-4 border-t border-neutral-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything about food..."
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange focus:bg-white text-sm"
              />
              <button
                type="submit"
                className="w-12 h-12 bg-primary-orange text-white rounded-full hover:bg-primary-orange/90 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}