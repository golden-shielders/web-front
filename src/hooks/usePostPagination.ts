import { useEffect } from "react";
import { useSearchParams } from "react-router";

interface UsePostPaginationOptions {
  currentItemCount: number;
  defaultPage?: number;
  defaultSize?: number;
  defaultSort?: string;
}

interface UsePostPaginationResult {
  page: number;
  size: number;
  sort: string;
  hasPrev: boolean;
  hasNext: boolean;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  goToPage: (nextPage: number) => void;
  setSize: (nextSize: number) => void;
  setSort: (nextSort: string) => void;
}

function parseNonNegativeInt(value: string | null, fallback: number): number {
  if (value === null) return fallback;

  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function parsePositiveInt(value: string | null, fallback: number): number {
  if (value === null) return fallback;

  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export default function usePostPagination({
  currentItemCount,
  defaultPage = 0,
  defaultSize = 10,
  defaultSort = "id desc",
}: UsePostPaginationOptions): UsePostPaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseNonNegativeInt(searchParams.get("page"), defaultPage);
  const size = parsePositiveInt(searchParams.get("size"), defaultSize);
  const sort = searchParams.get("sort") ?? defaultSort;

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    let changed = false;

    if (!searchParams.has("page")) {
      nextParams.set("page", String(defaultPage));
      changed = true;
    }

    if (!searchParams.has("size")) {
      nextParams.set("size", String(defaultSize));
      changed = true;
    }

    if (!searchParams.has("sort")) {
      nextParams.set("sort", defaultSort);
      changed = true;
    }

    if (changed) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams, defaultPage, defaultSize, defaultSort]);

  function updateParams(next: {
    page?: number;
    size?: number;
    sort?: string;
  }): void {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("page", String(next.page ?? page));
    nextParams.set("size", String(next.size ?? size));
    nextParams.set("sort", next.sort ?? sort);

    setSearchParams(nextParams);
  }

  function goToPage(nextPage: number): void {
    if (nextPage < 0) return;
    updateParams({ page: nextPage });
  }

  function goToPrevPage(): void {
    if (page <= 0) return;
    updateParams({ page: page - 1 });
  }

  function goToNextPage(): void {
    if (currentItemCount < size) return;
    updateParams({ page: page + 1 });
  }

  function setSize(nextSize: number): void {
    if (nextSize <= 0) return;
    updateParams({
      page: 0,
      size: nextSize,
    });
  }

  function setSort(nextSort: string): void {
    updateParams({
      page: 0,
      sort: nextSort,
    });
  }

  return {
    page,
    size,
    sort,
    hasPrev: page > 0,
    hasNext: currentItemCount === size,
    goToPrevPage,
    goToNextPage,
    goToPage,
    setSize,
    setSort,
  };
}
