import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none"
        onClick={() => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        }}>
        <span className="sr-only">View notifications</span>
        {mounted && (
          <>
            {resolvedTheme ? (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </>
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
