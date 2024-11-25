import { useState } from "react";
import { SplashScreen } from "./components/SplashScreen/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <div className="min-h-screen bg-gray-50"></div>;
}

export default App;
