export type QueryItem = string | undefined;

export type QueryItemPattern = QueryItem | null;

export type ItemsRange = {
  prev: QueryItem;
  current: string;
  next: QueryItem;
};

export type ItemsRangePattern = {
  prev?: QueryItemPattern;
  current?: QueryItemPattern;
  next?: QueryItemPattern;
  nestingLevel?: number | undefined;
};

export type FormatRange = (range: ItemsRange, indentSize: number) => string;

export interface PrettifyResult {
  query: string;
  errorMessage?: string;
}
