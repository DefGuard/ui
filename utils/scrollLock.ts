const rootElement = document.getElementById('root') as HTMLElement;

export const lockRootScroll = () => {
  const scrollbarWidth = rootElement.offsetWidth - rootElement.clientWidth;
  rootElement.style.paddingRight = `${scrollbarWidth}px`;
  rootElement.style.overflowY = 'hidden';
};

export const unlockRootScroll = () => {
  rootElement.style.overflowY = 'auto';
  rootElement.style.paddingRight = '';
};
