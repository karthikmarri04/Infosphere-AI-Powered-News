import { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import useNewsFeed from "../hooks/useNewsFeed";
import { Globe, MapPin, Users, Zap, Vote, Trophy, TrendingUp, Languages, Eye, Calendar, ExternalLink } from 'lucide-react';

const Home = ({ filter, location }) => {
  const { articles, fetchMore, resetFeed, loading, error, hasMore, fetchNews } = useNewsFeed(filter, location);

  useEffect(() => {
    resetFeed();
    fetchNews(1, true);
  }, [filter]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight &&
        hasMore &&
        !loading
      ) {
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, hasMore, loading]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Unable to load news
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => {
              resetFeed();
              fetchNews(1, true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {articles.length === 0 && loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, idx) => (
                <NewsCard key={`${article.url}-${idx}`} article={article} />
              ))}
            </div>

            {loading && articles.length > 0 && (
              <div className="flex justify-center py-12">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Loading more articles...</span>
                </div>
              </div>
            )}

            {!hasMore && articles.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  You've reached the end of the news feed
                </p>
              </div>
            )}

            {articles.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No articles found for this category
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};
export default Home;