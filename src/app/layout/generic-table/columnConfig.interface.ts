export interface ColumnConfig {
  name: string;
  headerText: string;
  cellTemplate: (row: any) => string;
}
