type SearchParamsRaw = {
  search?: string | string[] | undefined;
  sort?: string | string[] | undefined;
};

export type SearchParams = SearchParamsRaw | Promise<SearchParamsRaw>;

export type SearchParamsValue = {
  search?: string | undefined;
  sort?: string | undefined;
};