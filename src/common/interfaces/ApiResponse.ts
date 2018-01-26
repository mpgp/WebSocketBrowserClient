export interface ApiResponse<T> {
    data: T;
    errors: string[];
}
