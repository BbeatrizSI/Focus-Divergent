import { useTheme } from '../hooks/useTheme'
import { HiMoon, HiSun } from 'react-icons/hi2'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-calm-100 dark:bg-peaceful-700 hover:bg-calm-200 dark:hover:bg-peaceful-600 transition-all duration-200 hover:scale-110 active:scale-95 w-10 h-10 flex items-center justify-center"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {theme === 'light' ? (
        <HiMoon className="w-5 h-5 text-calm-700 dark:text-peaceful-200" />
      ) : (
        <HiSun className="w-5 h-5 text-calm-700 dark:text-peaceful-200" />
      )}
    </button>
  )
}
