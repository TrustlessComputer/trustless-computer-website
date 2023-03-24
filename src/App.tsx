import "./reset.scss";

import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { store } from "lib/store";
import { ThemedGlobalStyle, ThemeProvider } from "lib/theme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
