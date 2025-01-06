import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="absolute right-4 top-4">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Sun
          className={`h-[1.2rem] w-[1.2rem] transition-transform ${
            theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-transform ${
            theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
      </Button>
    </div>
  );
}
