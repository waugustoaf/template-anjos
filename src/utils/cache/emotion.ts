import createCache from '@emotion/cache';

export const emotion = {
  createEmotionCache: () => {
    return createCache({ key: 'css' });
  },
};
