import { Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { openContextModal } from '@mantine/modals';

function App() {
  // const [lang, setLang] = useState(localStorage.getItem('i18nextLng'));
  // const { t } = useTranslation();

  useShallowEffect(() => {
    openContextModal({
      withCloseButton: false,
      closeOnEscape: false,
      closeOnClickOutside: false,
      modal: 'SelectTilesetModal',
      title: 'WELCOME TO TILEMAP',
      innerProps: {},
    });
  }, [{ a: 1 }]);
  return <Text>Welcome to Mantine!</Text>;
}

export default App;
