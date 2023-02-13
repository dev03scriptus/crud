export interface ITableColumn {
  title: string;
  fieldName: string;
  getValue?: (obj: Record<string, unknown>) => any;
}
