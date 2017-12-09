/**
 * The model is the main diference.
 * It is kind of a state "with steroids"
 * It holds 5 properties
 * 1. The namespace in the store for the current model state
 * 2. The state itself, which can include the initial state.
 *    Although the initial state declared in dva({}) has priority
 * 3. The store reducers. These are triggered by actions put or dispatch
 * 4. The store effects, to use redux sagas. takeEvert, takeLates, throttle, watcher...
 * 5. Store subscriptions to data sources. These take effect in app.start()
 */
import keyListener from 'keymaster';

export default {
  // 1. Namespace in the store
  namespace: 'counters',
  // 2. State, here is empty, but we are using an initial state with dva({}) in index.js
  state: {},
  // 3. The reducers
  reducers: {
    add(state, { index, step }) {
      const available = state[index] !== undefined;
      const model = available ? state[index] : { top: 0, current: 0 };
      const newCurrent = model.current + step;
      model.top = newCurrent > model.top ? newCurrent : model.top;
      model.current = newCurrent;
      const newState = {
        ...state,
      };
      newState[index] = model;
      return newState;
    },
    sub(state, { index, step }) {
      const available = state[index] !== undefined;
      const model = available ? state[index] : { top: 0, current: step };
      const newCurrent = model.current - step;
      model.current = newCurrent;
      const newState = {
        ...state,
      };
      newState[index] = model;
      return newState;
    },
    reset(state) {
      const newState = {};
      Object.keys(state).forEach((key) => {
        newState[key] = { top: 0, current: 0 };
      });
      return newState;
    },
    incrementAll(state) {
      const newState = {};
      Object.keys(state).forEach((key) => {
        const newCurrent = state[key].current + 1;
        const newtop = newCurrent > state[key].top ? newCurrent : state[key].top;
        newState[key] = { top: newtop, current: newCurrent };
      });
      return newState;
    },
    decrementAll(state) {
      const newState = {};
      Object.keys(state).forEach((key) => {
        const newcurrent = state[key].current - 1;
        newState[key] = { top: state[key].top, current: newcurrent };
      });
      return newState;
    },
    flagAsync(state, { index, status }) {
      const available = state[index] !== undefined;
      const model = available ? state[index] : { top: 0, current: 0 };
      model.async = status;
      const newState = {
        ...state,
      };
      newState[index] = model;
      return newState;
    },
  },
  // 4. The effects for async operations
  effects: {
    *addAsync(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'incrementAll' });
    },
    *subAsync(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'decrementAll' });
    },
  },
  // 5. Suscriptions
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      keyListener('⌘+up, ctrl+up', () => {
        dispatch({ type: 'addAsync' });
      });
      keyListener('⌘+down, ctrl+down', () => {
        dispatch({ type: 'subAsync' });
      });
      keyListener('space', () => {
        dispatch({ type: 'reset' });
      });
    },
  },
};

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
