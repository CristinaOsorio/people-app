export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
