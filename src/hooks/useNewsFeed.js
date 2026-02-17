import { useState, useCallback } from "react";

const useNewsFeed = (filter, location) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

const fetchNews = useCallback(async (pageNum = 1, reset = false) => {
  if (loading || !hasMore) return;

  setLoading(true);
  setError(null);

  try {
    let url = '';
    const apiKey = import.meta.env.VITE_CURRENTS_API_KEY;
    const baseUrl = 'https://api.currentsapi.services/v1';

    // Build API URL based on filter type
    if (filter === 'global') {
      url = `${baseUrl}/latest-news?apiKey=${apiKey}&page_number=${pageNum}&page_size=12`;
    } else if (filter === 'country' && location.country) {
      url = `${baseUrl}/latest-news?apiKey=${apiKey}&country=${location.countryCode}&page_number=${pageNum}&page_size=12`;
    } else if (filter === 'local' && location.city) {
      url = `${baseUrl}/search?apiKey=${apiKey}&keywords="${location.city}"+"${location.state}"&page_number=${pageNum}&page_size=12`;
    } else if (['technology', 'politics', 'sports', 'business', 'health', 'entertainment'].includes(filter)) {
      const categoryMap = {
        politics: 'politics',
        technology: 'technology',
        sports: 'sports',
        business: 'business',
        health: 'health',
        entertainment: 'entertainment'
      };
      url = `${baseUrl}/latest-news?apiKey=${apiKey}&category=${categoryMap[filter]}&page_number=${pageNum}&page_size=12`;
    } else {
      url = `${baseUrl}/latest-news?apiKey=${apiKey}&page_number=${pageNum}&page_size=12`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }

    const newArticles =
      data.news?.filter(
        (article) =>
          article.title &&
          article.description &&
          article.title !== '[Removed]' &&
          article.description !== '[Removed]'
      ) || [];

    if (reset) {
      setArticles(newArticles);
    } else {
      setArticles(prev => [...prev, ...newArticles]);
    }

    setHasMore(newArticles.length === 12);
    setPage(pageNum + 1);
  } catch (err) {
    console.error('Error fetching news:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, [filter, location, loading]);


  const resetFeed = useCallback(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  const fetchMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchNews(page);
    }
  }, [page, hasMore, loading, fetchNews]);

  return { articles, fetchMore, resetFeed, loading, error, hasMore, fetchNews };
};

export default useNewsFeed;