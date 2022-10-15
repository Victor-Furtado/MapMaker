import {
  Box,
  Center,
  Group,
  GroupProps,
  SegmentedControl,
  useMantineColorScheme
} from '@mantine/core';
import { BiMoon, BiSun } from 'react-icons/bi';

export default function ColorSchemeToggler(props: GroupProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group {...props} position="center" my="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <BiSun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <BiMoon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}
