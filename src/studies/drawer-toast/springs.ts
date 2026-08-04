/* Two springs, stated and pinned. The drawer is stiffer and better
   damped than the toast: furniture should settle with authority, while
   a toast may carry one visible degree of bounce because it is news. */
export const SPRINGS = {
  drawer: { stiffness: 380, damping: 34 },
  toast: { stiffness: 300, damping: 26 },
} as const;
