import { useInfiniteQuery } from '@tanstack/react-query';

import useIntersect from './useIntersect.jsx';

import { Target } from '../components/Target/index.js';

export default function usePagination({ queryKey, queryFn }) {
  const {
    data,
    hasNextPage,
    isFetching,
    status,
    fetchNextPage: next,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // 마지막 페이지에 대한 값이 없어 임의로 설정
      if (lastPage?.last === true) {
        return null;
      }

      if (lastPage?.length === 0) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  const fetchNextPage = () => {
    if (hasNextPage && !isFetching) {
      next();
    }
  };

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        next();
      }
    },
    { threshold: 0.8 }
  );

  return { data, isFetching, fetchNextPage, status, ref, Target };
}
