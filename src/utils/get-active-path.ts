import { closest } from "fastest-levenshtein";

export const getActivePath = (
  currentPath: string,
  path: string[],
  excludedPaths?: string[],
) => {
  const closestPath = closest(currentPath, path.concat(excludedPaths || []));
  const index = path.indexOf(closestPath);
  return { active: path[index], activeIndex: index };
};
