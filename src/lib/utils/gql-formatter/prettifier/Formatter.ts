import {
  QueryItem,
  QueryItemPattern,
  ItemsRange,
  ItemsRangePattern,
  FormatRange,
} from './types';

export class Formatter {
  private pattern: ItemsRangePattern;
  private formatRange: FormatRange;

  constructor(pattern: ItemsRangePattern, map: FormatRange) {
    this.pattern = pattern;
    this.formatRange = map;
  }

  isMatch(range: ItemsRange, nestingLevel: number): boolean {
    return (
      (this.pattern.nestingLevel == undefined ||
        this.pattern.nestingLevel === nestingLevel) &&
      this.isPatternMatch(this.pattern.prev, range.prev) &&
      this.isPatternMatch(this.pattern.current, range.current) &&
      this.isPatternMatch(this.pattern.next, range.next)
    );
  }

  format(range: ItemsRange, indentSize: number): string {
    return this.formatRange(range, indentSize);
  }

  private isPatternMatch(pattern: QueryItemPattern, item: QueryItem): boolean {
    return pattern === undefined || pattern == item;
  }
}
