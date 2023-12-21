import {
  TQueryItem,
  TQueryItemPattern,
  IRangeItems,
  IRangeItemsPattern,
  TFormatRange,
} from './types';

export class Formatter {
  private pattern: IRangeItemsPattern;
  private formatRange: TFormatRange;

  constructor(pattern: IRangeItemsPattern, map: TFormatRange) {
    this.pattern = pattern;
    this.formatRange = map;
  }

  isMatch(range: IRangeItems, nestingLevel: number): boolean {
    return (
      (this.pattern.nestingLevel == undefined ||
        this.pattern.nestingLevel === nestingLevel) &&
      this.isPatternMatch(this.pattern.prev, range.prev) &&
      this.isPatternMatch(this.pattern.current, range.current) &&
      this.isPatternMatch(this.pattern.next, range.next)
    );
  }

  format(range: IRangeItems, indentSize: number): string {
    return this.formatRange(range, indentSize);
  }

  private isPatternMatch(
    pattern: TQueryItemPattern,
    item: TQueryItem
  ): boolean {
    return (
      pattern === undefined ||
      pattern == item ||
      (pattern instanceof RegExp && !!item?.match(pattern))
    );
  }
}
