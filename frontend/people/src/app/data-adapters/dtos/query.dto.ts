import { SortDto } from './sort.dto';

export interface QueryDto {
    pageSize: number;
    pageNumber: number;
    sort: SortDto;
}