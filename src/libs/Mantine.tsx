import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { ReactNode, useState } from 'react';

interface MantineProps {
  children: ReactNode;
}

export default function MantineConfig(props: MantineProps) {
  const { children } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem('COLOR_SCHEME') as ColorScheme) || 'light'
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    localStorage.setItem('COLOR_SCHEME', nextColorScheme);
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NotificationsProvider position="bottom-center">{children}</NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
