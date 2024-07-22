import React, { useCallback, useMemo } from "react";
import { Button } from "@nextui-org/button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import useDarkMode from "use-dark-mode";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface DefaultLayoutProps {
  children: React.ReactNode;
  actions?: MenuAction[];
}

export interface MenuAction {
  children?: React.ReactNode;
  label?: string;
  action: () => {};
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, actions }) => {
  const darkMode = useDarkMode(false);

  const toggleTheme = useCallback(() => {
    darkMode.toggle();
  }, [darkMode]);

  const themeToggleAction = useMemo(() => {
    return {
      children: darkMode.value ? (
        <LightModeRoundedIcon />
      ) : (
        <DarkModeRoundedIcon />
      ),
      label: darkMode.value ? "Light Mode" : "Dark Mode",
      action: toggleTheme,
    } as MenuAction;
  }, [darkMode]);

  actions = [...(actions === undefined ? [] : actions), themeToggleAction];

  return (
    <div className="relative flex flex-col h-screen">
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="absolute top-5 right-5 z-10"
            isIconOnly={true}
            variant="light"
            onClick={() => {}}
          >
            <MenuRoundedIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => actions[Number.parseInt(key.toString())].action()}
        >
          {actions.map((action, index) => (
            <DropdownItem key={index} startContent={action.children}>
              {action.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <main className="container mx-auto max-w-7xl px-6 flex-grow flex flex-col gap pt-16">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
