import { useEffect, useMemo, useState } from 'react';

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  next: () => void;
  prev: () => void;
  goToPage: (page: number) => void;
}

/**
 * Phân trang cho mảng dữ liệu generic.
 * @param data Mảng dữ liệu bất kỳ
 * @param itemsPerPage Số item mỗi trang (> 0)
 */
export function usePagination<T>(
  data: T[],
  itemsPerPage: number
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tổng số trang – luôn tối thiểu 1 để tránh chia 0
  const totalPages = useMemo<number>(() => {
    if (itemsPerPage <= 0) return 1;
    return Math.max(1, Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage]);

  // Khi data thay đổi (filter/search) khiến trang hiện tại vượt tổng số trang → reset
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  // Dữ liệu của trang hiện tại
  const currentItems = useMemo<T[]>(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const next = (): void => {
    setCurrentPage(p => Math.min(p + 1, totalPages));
  };

  const prev = (): void => {
    setCurrentPage(p => Math.max(p - 1, 1));
  };

  const goToPage = (page: number): void => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return { currentPage, totalPages, currentItems, next, prev, goToPage };
}