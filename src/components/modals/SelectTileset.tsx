import { Stack } from '@mantine/core';
import ColorSchemeToggler from '../ColorSchemeToggler';
import SelectTileSetDropzone from '../SelectTileSetDropzone';

export function SelectTilesetModal() {
  return (
    <Stack>
      <SelectTileSetDropzone />
      <ColorSchemeToggler />
      {/* <NativeSelect
            data={Object.entries(availableLanguages).map(([value, label]) => ({
              value,
              label,
            }))}
            value={lang}
            onChange={(e) => setLang(e.currentTarget.value)}
          /> */}
    </Stack>
  );
}
