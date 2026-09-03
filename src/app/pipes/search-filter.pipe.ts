import { Pipe, PipeTransform } from '@angular/core';

/**
 * Replacement for the discontinued ng2-search-filter package, with the same
 * semantics: keeps the items where any property, searched recursively, contains
 * the term (case-insensitive). Impure because the lists it filters are mutated
 * in place by the pages that use it.
 */
@Pipe({ name: 'filter', pure: false })
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!term || !items) {
      return items;
    }
    const needle = term.toLowerCase();
    return items.filter(item => SearchFilterPipe.contains(item, needle));
  }

  private static contains(item: any, needle: string): boolean {
    for (const key in item) {
      const value = item[key];
      if (value === null || value === undefined) {
        continue;
      }
      if (typeof value === 'object' && SearchFilterPipe.contains(value, needle)) {
        return true;
      }
      if (value.toString().toLowerCase().includes(needle)) {
        return true;
      }
    }
    return false;
  }
}
