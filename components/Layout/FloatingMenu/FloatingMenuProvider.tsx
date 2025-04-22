import { FloatingMenuContextOptions } from './types';
import { FloatingMenuContext, useFloatingMenu } from './useFloatingMenuContext';

export function FloatingMenuProvider({
  children,
  ...options
}: { children: React.ReactNode } & FloatingMenuContextOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useFloatingMenu(options);
  return (
    <FloatingMenuContext.Provider value={tooltip}>
      {children}
    </FloatingMenuContext.Provider>
  );
}
