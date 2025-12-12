"use client";
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Phone, Share2, Heart, Navigation, TrendingUp } from 'lucide-react';
import { Screen, Restaurant } from '../../app/page';
import Image from "next/image";
interface RestaurantDetailProps {
  restaurant: Restaurant;
  onNavigate: (screen: Screen) => void;
  isGroupMode: boolean;
}

export default function RestaurantDetail({ restaurant, onNavigate, isGroupMode }: RestaurantDetailProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOrderNow = () => {
    console.log("hello");
    // onNavigate('rating', restaurant);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-900" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-900'}`} />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg">
            <Share2 className="w-5 h-5 text-neutral-900" />
          </button>
        </div>

        {/* Restaurant Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
              <span className="text-white/70 text-sm">({restaurant.reviews} reviews)</span>
            </div>
            <span className="text-white/90">{restaurant.cuisine}</span>
            <span className="text-white/90">{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <MapPin className="w-5 h-5 text-primary-orange mx-auto mb-1" />
            <p className="text-sm text-neutral-600">{restaurant.distance}</p>
            <p className="text-xs text-neutral-400">Distance</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <Clock className="w-5 h-5 text-primary-green mx-auto mb-1" />
            <p className="text-sm text-neutral-600">25-30 min</p>
            <p className="text-xs text-neutral-400">Delivery</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <TrendingUp className="w-5 h-5 text-primary-orange mx-auto mb-1" />
            <p className="text-sm text-neutral-600">{restaurant.pickCount}</p>
            <p className="text-xs text-neutral-400">Team Picks</p>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h4 className="mb-4">Location & Contact</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{restaurant.address}</p>
                <button className="text-primary-orange text-sm mt-1 flex items-center gap-1 hover:underline">
                  <Navigation className="w-3 h-3" />
                  Get Directions
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-neutral-400" />
              <p className="text-sm">{restaurant.hours}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-neutral-400" />
              <a href="tel:+1234567890" className="text-sm text-primary-orange hover:underline">
                (704) 555-0123
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h4 className="mb-3">About</h4>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-sm">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex-1 py-4 text-sm transition-colors ${
                activeTab === 'menu'
                  ? 'border-b-2 border-primary-orange text-primary-orange'
                  : 'text-neutral-600'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary-orange text-primary-orange'
                  : 'text-neutral-600'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 text-sm transition-colors ${
                activeTab === 'info'
                  ? 'border-b-2 border-primary-orange text-primary-orange'
                  : 'text-neutral-600'
              }`}
            >
              Info
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'menu' && (
              <div className="space-y-3">
                <h5 className="mb-4">Popular Items</h5>
                {restaurant.menuItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                    <div className="flex-1">
                      <p>{item}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {index % 2 === 0 ? 'Signature dish' : 'Customer favorite'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-orange">${(12 + index * 2)}.99</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center text-white">
                      JS
                    </div>
                    <div>
                      <p className="text-sm">John Smith</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-neutral-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-neutral-700">
                    Amazing food and great service! The portions are generous and everything tastes fresh. Definitely coming back!
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white">
                      MJ
                    </div>
                    <div>
                      <p className="text-sm">Mary Johnson</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Star className="w-3 h-3 text-neutral-300" />
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-neutral-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-neutral-700">
                    Good quality food at reasonable prices. Perfect for team lunches!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-4">
                <div>
                  <h5 className="mb-2">Cuisine Type</h5>
                  <p className="text-sm text-neutral-700">{restaurant.cuisine}</p>
                </div>
                <div>
                  <h5 className="mb-2">Price Range</h5>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary-green" />
                    <p className="text-sm text-neutral-700">
                      {restaurant.priceRange} • Average ${15}-${25} per person
                    </p>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">Payment Methods</h5>
                  <p className="text-sm text-neutral-700">Cash, Credit Cards, Mobile Payment</p>
                </div>
                <div>
                  <h5 className="mb-2">Amenities</h5>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs">Dine-in</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs">Takeout</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs">Delivery</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs">WiFi</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs">Parking</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4 rounded-b-2xl shadow-lg mb-6">
          <button
            onClick={handleOrderNow}
            className="w-full bg-gradient-to-r from-primary-orange to-primary-green text-white py-4 rounded-full hover:shadow-lg transition-all"
          >
            {isGroupMode ? 'Add to Group Vote' : 'Order Now'}
          </button>
        </div>
      </div>
    </div>
  );
}