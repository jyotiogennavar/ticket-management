"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
