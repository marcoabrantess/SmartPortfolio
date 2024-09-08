import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router'
import { UserAmountProvider } from './context/UserAmountContext';

function App() {
  return (
    <UserAmountProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserAmountProvider>
  );
}

export default App;
