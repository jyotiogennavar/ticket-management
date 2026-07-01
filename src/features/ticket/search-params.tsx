import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortOptions = {
  sortKey: ["createdAt", "bounty"],
  sortValue: ["asc", "desc"],
};
  
export const sortParser = {
  sortKey: parseAsStringLiteral(["createdAt", "bounty"])
    .withDefault("createdAt")
    .withOptions({
      shallow: false,
      clearOnDefault: true,
    }),
  sortValue: parseAsStringLiteral(["asc", "desc"]).withDefault("desc").withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;