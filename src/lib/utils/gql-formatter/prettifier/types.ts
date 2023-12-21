export type TQueryItem = string | undefined;

export type TQueryItemPattern = TQueryItem | null | RegExp;

export interface IRangeItems {
  prev: TQueryItem;
  current: string;
  next: TQueryItem;
}

export interface IRangeItemsPattern {
  prev?: TQueryItemPattern;
  current?: TQueryItemPattern;
  next?: TQueryItemPattern;
  nestingLevel?: number | undefined;
}

export type TFormatRange = (range: IRangeItems, indentSize: number) => string;

export interface IComment {
  [type: string]: string;
}

export interface IPrettifyQueryResult {
  query: string;
  errorMessage?: boolean;
}
