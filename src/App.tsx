import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";
import { StockList } from "./components/StockList/StockList";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              NASDAQ Stock Explorer
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <SearchBar />
          </div>
          <StockList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
