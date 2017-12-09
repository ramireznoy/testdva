import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize the store
const app = dva({
  initialState: {
    counters: {
      counter0: { top: 5, current: 2 },
      counter1: { top: 10, current: 9 },
      counter2: { top: 8, current: -5 },
    },
  },
});

// 2. Add plugins
app.use(createLoading({
  effects: false,
}));

// 3. Attach the models
app.model(require('./models/counters'));

// 4. Include the router
app.router(require('./router'));

// 5. Start
app.start('#root');
