import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

export default function App() {
  const [selectedDay, setSelectedDay] = useState(0);

  const weatherData = [
    { day: 'Today', icon: Sun, temp: 28, high: 32, low: 22, condition: 'Sunny', humidity: 45, wind: 12, uv: 8 },
    { day: 'Tue', icon: Cloud, temp: 25, high: 28, low: 20, condition: 'Cloudy', humidity: 60, wind: 18, uv: 4 },
    { day: 'Wed', icon: CloudRain, temp: 22, high: 24, low: 18, condition: 'Rainy', humidity: 85, wind: 25, uv: 2 },
    { day: 'Thu', icon: CloudSnow, temp: 18, high: 20, low: 12, condition: 'Snow', humidity: 70, wind: 15, uv: 1 },
    { day: 'Fri', icon: Sun, temp: 30, high: 34, low: 24, condition: 'Sunny', humidity: 40, wind: 8, uv: 9 },
    { day: 'Sat', icon: Cloud, temp: 26, high: 29, low: 21, condition: 'Cloudy', humidity: 55, wind: 14, uv: 5 },
    { day: 'Sun', icon: Sun, temp: 29, high: 33, low: 23, condition: 'Sunny', humidity: 42, wind: 10, uv: 7 },
  ];

  const current = weatherData[selectedDay];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Spider Weather</h1>
            <p className="text-sm text-blue-200/60">M4 Spider Canvas</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-200/60">Last updated</p>
            <p className="text-sm text-white font-mono">Just now</p>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200/80 text-sm font-medium">{current.day}</p>
              <div className="text-6xl font-bold text-white mt-1">{current.temp}°</div>
              <p className="text-blue-200 mt-2">{current.condition}</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full"></div>
              <IconComponent className="w-24 h-24 text-yellow-300 relative z-10 drop-shadow-lg" />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-semibold">↑ {current.high}°</span>
              <span className="text-blue-300 font-semibold">↓ {current.low}°</span>
            </div>
            <div className="flex items-center gap-4 text-blue-200/80 text-sm">
              <span className="flex items-center gap-1"><Droplets className="w-4 h-4" /> {current.humidity}%</span>
              <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> {current.wind}km/h</span>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mb-4 border border-white/20">
          <h3 className="text-sm font-semibold text-blue-200 mb-3">7-Day Forecast</h3>
          <div className="space-y-2">
            {weatherData.map((day, i) => {
              const DayIcon = day.icon;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                    selectedDay === i 
                      ? 'bg-white/20 border border-white/30' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`w-12 text-left text-sm font-medium ${selectedDay === i ? 'text-white' : 'text-blue-200/80'}`}>
                    {day.day}
                  </span>
                  <DayIcon className={`w-5 h-5 ${selectedDay === i ? 'text-yellow-300' : 'text-blue-300/60'}`} />
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${selectedDay === i ? 'text-white' : 'text-blue-200/60'}`}>
                      {day.high}°
                    </span>
                    <span className="text-xs text-blue-300/40">{day.low}°</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-blue-200/60">Feels Like</span>
            </div>
            <div className="text-2xl font-bold text-white">{current.temp + 2}°</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-blue-200/60">UV Index</span>
            </div>
            <div className="text-2xl font-bold text-white">{current.uv}</div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-blue-200/40 mt-6">
          Powered by 🕷️ Spider Canvas
        </p>
      </div>
    </div>
  );
}
