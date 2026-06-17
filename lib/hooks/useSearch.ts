'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

async function fetchSearch(q: string) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export function useSearch(query: string) {
  const debounced = useDebounce(query, 300);

  const result = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => fetchSearch(debounced),
    enabled: debounced.trim().length >= 2,
    staleTime: 60 * 1000,
  });

  return { ...result, debouncedQuery: debounced };
}
