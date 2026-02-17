import { useState } from "react";
import { summarizeWithGemini } from "../utils/gemini";
import { Globe, MapPin, Users, Zap, Vote, Trophy, TrendingUp, Languages, Eye, Calendar, ExternalLink } from 'lucide-react';

const NewsCard = ({ article }) => {
  const [summary, setSummary] = useState("");
  const [lang, setLang] = useState("en");
  const [summarizing, setSummarizing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const result = await summarizeWithGemini(article.content || article.description, lang);
      setSummary(result);
    } finally {
      setSummarizing(false);
    }
  };

 const formatDate = (dateString) => {
  if (!dateString) return "Date unavailable";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "Date unavailable";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {article.urlToImage && (
        <div className="relative overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-3 h-3" />
         
          <span>{formatDate(article.published || article.published_at || article.publishedAt)}</span>

          {article.source?.name && (
            <>
              <span>•</span>
              <span className="font-medium">{article.source.name}</span>
            </>
          )}
        </div>

        <h2 className="font-bold text-lg leading-tight mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <p className={showFullDescription ? '' : 'line-clamp-3'}>
            {article.description}
          </p>
          {article.description && article.description.length > 120 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 dark:text-blue-400 hover:underline mt-1 text-xs flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {summary && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-blue-100 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">AI Summary</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">
              {summary}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-gray-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSummarize}
              disabled={summarizing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className={`w-3 h-3 ${summarizing ? 'animate-spin' : ''}`} />
              {summarizing ? 'Summarizing...' : 'Summarize'}
            </button>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Read
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;