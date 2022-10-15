import { Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import ColorSchemeToggler from './components/ColorSchemeToggler';
import DropzoneButton from './components/DropZone';

function App() {
  // const [lang, setLang] = useState(localStorage.getItem('i18nextLng'));
  // const { t } = useTranslation();

  useShallowEffect(() => {
    openModal({
      title: 'WELCOME TO TILEMAP',
      children: (
        <Stack>
          <DropzoneButton />
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
      ),
    });
  }, [{ a: 1 }]);
  return <Text>Welcome to Mantine!</Text>;
}

export default App;
