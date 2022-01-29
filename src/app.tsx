const dvaKey = 'model_state';

function getPersistedState() {
  const content = window.localStorage.getItem(dvaKey);
  if (!content) {
    return null;
  }

  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export const dva = {
  config: {
    initialState: getPersistedState(),
    onStateChange: (state: any) => {
      window.localStorage.setItem(dvaKey, JSON.stringify(state));
    },
  },
};
