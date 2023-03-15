import { NavGroup, NavLink } from '@/types/app/layout';
import { NextRouter } from 'next/router';

export const handleURLQueries = (
  router: NextRouter,
  path: string | undefined,
): boolean => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query);

    return (
      router.asPath.includes(path) &&
      router.asPath.includes(router.query[arr[0]] as string) &&
      path !== '/'
    );
  }

  return false;
};

export const hasActiveChild = (item: NavGroup, currentURL: string): boolean => {
  const { children } = item;

  if (!children) {
    return false;
  }

  for (const child of children) {
    if ((child as NavGroup).children) {
      if (hasActiveChild(child, currentURL)) {
        return true;
      }
    }
    const childPath = (child as NavLink).path;

    if (
      child &&
      childPath &&
      currentURL &&
      (childPath === currentURL ||
        (currentURL.includes(childPath) && childPath !== '/'))
    ) {
      return true;
    }
  }

  return false;
};

export const removeChildren = (
  children: NavLink[],
  openGroup: string[],
  currentActiveGroup: string[],
) => {
  children.forEach((child: NavLink) => {
    if (!currentActiveGroup.includes(child.title)) {
      const index = openGroup.indexOf(child.title);
      if (index > -1) openGroup.splice(index, 1);

      // @ts-ignore
      if (child.children)
      // @ts-ignore
        removeChildren(child.children, openGroup, currentActiveGroup);
    }
  });
};
