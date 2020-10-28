import { SortDirection } from './sort-direction';
export interface SortDto {
    field: string;
    direction: SortDirection | string;
}
