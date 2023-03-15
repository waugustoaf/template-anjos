import { PaginationProps } from "@/types/app/pagination";

export function mergePagination(props?: PaginationProps) {
  const defaultPaginationProps = {
    search: '',
    page: 1,
    take: 20,
  };

  if (!props || typeof props !== 'object') {
    return defaultPaginationProps;
  }

  return {
    ...defaultPaginationProps,
    ...props,
  };
}
