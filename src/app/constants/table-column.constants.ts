import { ITableColumn } from "../modules/table-column.model";

class TableColumn implements ITableColumn {
  title: string;
  fieldName: string;
  getValue: (obj: Record<string, unknown>) => any;

  constructor(
    columnConfig: ITableColumn
  ) {
    const { title, fieldName, getValue = (obj : any) => obj[fieldName] } = columnConfig;
    this.title = title;
    this.fieldName = fieldName;
    this.getValue = getValue;
  }
}

export const SettingsUserColumnList: Record<string, ITableColumn> = {
  API: new TableColumn({
    title: 'API',
    fieldName: 'API',
  }),
  Description: new TableColumn({
    title: 'Description',
    fieldName: 'Description',
  }),
  Auth: new TableColumn({
    title: 'Auth',
    fieldName: 'Auth',
  }),
  HTTPS: new TableColumn({
    title: 'HTTPS',
    fieldName: 'HTTPS',
  }),
  Cors: new TableColumn({
    title: 'Cors',
    fieldName: 'Cors',
  }),
  Link: new TableColumn({
    title: 'Link',
    fieldName: 'Link',
  }),
  Category: new TableColumn({
    title: 'Category',
    fieldName: 'Category',
  })
}

export const UserColumnList: ITableColumn[] = [
  SettingsUserColumnList["API"],
  SettingsUserColumnList["Description"],
  SettingsUserColumnList["Auth"],
  SettingsUserColumnList["HTTPS"],
  SettingsUserColumnList["Cors"],
  SettingsUserColumnList["Link"],
  SettingsUserColumnList["Category"],
]