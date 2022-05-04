export const debounce = (func: () => void) => {
  let timer: NodeJS.Timer | null;
  return function (...args: any) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};