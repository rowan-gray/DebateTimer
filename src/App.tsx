import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "use-dark-mode";

import { Side } from "@/types/side.tsx";
import { Provider } from "@/provider.tsx";

export type DebateContextType = {
  debate: Debate;
  setDebate: (debate: Debate) => void;
};

export interface Debate {
  configuration: Configuration;
  speechTimes: Map<number, number>;
  topic: string;
}

export const DefaultConfig = {
  name: "Custom",
  bellTimes: new Map<number, number>(),
  speakers: new Array<Speaker>(),
} as Configuration;

export const DefaultDebate = {
  configuration: DefaultConfig,
  speechTimes: new Map<number, number>(),
  topic: "",
} as Debate;

export const DebateContext = React.createContext<DebateContextType>({
  debate: DefaultDebate,
  setDebate: () => {},
});

export const useConfiguration = (
  debate: Debate | null,
  setDebate: (debatePage: Debate) => void,
) => {
  const configuration = useMemo(() => debate?.configuration, [debate]);
  const setConfiguration = useCallback(
    (configuration: Configuration) => {
      setDebate({
        ...(debate ?? DefaultDebate),
        configuration: configuration,
      });
    },
    [debate, setDebate],
  );

  return [configuration, setConfiguration] as [
    Configuration | null,
    (configuration: Configuration) => void,
  ];
};

export interface Configuration {
  name: string;
  bellTimes: Map<number, number>;
  speakers: Array<Speaker>;
}

export interface Speaker {
  side: Side;
  time: number | null;
  position: string;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [debate, setDebate] = useState<Debate>(DefaultDebate);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("configuration");
    }
  }, [location, navigate]);

  const darkMode = useDarkMode(false);

  useEffect(() => {
    darkMode.value
      ? document.body.classList.add("dark", "text-foreground", "bg-background")
      : document.body.classList.remove(
          "dark",
          "text-foreground",
          "bg-background",
        );
  }, [darkMode]);

  return (
    <DebateContext.Provider value={{ debate, setDebate }}>
      <Provider>
        <main>
          <Outlet />
        </main>
      </Provider>
    </DebateContext.Provider>
  );
}

export default App;
