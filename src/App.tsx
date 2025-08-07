import React from 'react';
import Navbar from './Navbar/navbar';
import DashboardPage from './pages';
import { Provider } from 'react-redux';
import { store } from './store';
import Footer from './Footer/footer';


const App: React.FC = () => {
  return (
    <Provider store={store}>
    <div className=" bg-gray-800">
      <Navbar />
      <main className="px-5 py-5">
        <DashboardPage />
      </main>
      <Footer/>
    </div>
    </Provider>
  );
};

export default App;
