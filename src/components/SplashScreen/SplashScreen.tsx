import { FC, useEffect, useState } from "react";
import { Gem } from "lucide-react";

interface Props {
  onComplete: () => void;
}

export const SplashScreen: FC<Props> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center mb-8">
        <Gem size={64} className="text-white animate-pulse" />
        <h1 className="text-4xl font-bold text-white ml-4">NASDAQ Explorer</h1>
      </div>
      <div className="absolute bottom-8 text-white/80 text-sm">
        Developed by Isaac Wahba
      </div>
    </div>
  );
};
