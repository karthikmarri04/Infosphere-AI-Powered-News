import { Globe, MapPin, Users, Zap, Vote, Trophy, TrendingUp, Languages, Eye, Calendar, ExternalLink } from 'lucide-react';
import {useState} from 'react';
const Navbar = ({ children, filter, setFilter, location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filters = [
    { key: "global", label: "Global", icon: Globe },
    { key: "country", label: location?.country || "Country", icon: MapPin },
    { key: "local", label: location?.city || "Local", icon: Users },
    { key: "technology", label: "Technology", icon: Zap },
    { key: "politics", label: "Politics", icon: Vote },
    { key: "sports", label: "Sports", icon: Trophy },
    { key: "business", label: "Business", icon: TrendingUp },
    { key: "health", label: "Health", icon: Users },
    { key: "entertainment", label: "Entertainment", icon: Users }
  ];

  const currentFilter = filters.find((f) => f.key === filter);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and current filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  INFOSPHERE
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 -mt-1">
                  AI-Powered News Summarization
                </p>
              </div>
            </div>

            {/* Current filter display */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {currentFilter && (
                <>
                  <currentFilter.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentFilter.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right side - Menu button and children */}
          <div className="flex items-center gap-4">
            {children}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
                <div
                  className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg animate-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-4 py-3 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filters.map((f) => {
                const IconComponent = f.icon;
                const isActive = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => {
                      setFilter(f.key);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-md z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
