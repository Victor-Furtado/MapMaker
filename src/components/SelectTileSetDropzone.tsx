import {
  Button, createStyles, Group, NumberInput, ScrollArea, SimpleGrid, Text, Title
} from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import {
  CSSProperties, useEffect, useRef, useState
} from 'react';
import { BiCloudUpload, BiDownload, BiError } from 'react-icons/bi';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  tilemap: {
    backgroundColor: 'gray',
    // display: 'flex',
    height: 230,
    // gap: 3
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

interface INumberOfTiles {
  horizontal: number;
  vertical: number;
}

interface IImage {
  width: number;
  height: number;
}

export default function SelectTileSetDropzone() {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  const [selectedFile, setSelectedFile] = useState<FileWithPath>();
  const [preview, setPreview] = useState<string>();

  const [image, setImage] = useState<IImage>();

  const [verticalTiles, setVerticalTiles] = useState(1);
  const [horizontalTiles, setHorizontalTiles] = useState(1);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, horizontalTiles, verticalTiles]);

  const onSelectFile = (files: FileWithPath[]) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(files[0]);
  };

  if (preview) {
    const h = (document.getElementById('i0')?.offsetHeight || 0) + 1;
    const w = (document.getElementById('i0')?.offsetWidth || 0) + 1;
    return (
      <fieldset className={classes.wrapper}>
        <legend>
          <Title order={4} px="xs">
            TILE MAP
          </Title>
        </legend>
        <ScrollArea classNames={{ viewport: classes.tilemap }}>
          {[...Array(horizontalTiles)].map((_, i) => (
            <img
              key={i}
              id={`i${i}`}
              style={{
                position: 'absolute',
                width: 368 - horizontalTiles,
                left: i * 1,
                clip: `rect(0, ${(i + 1) * (w / horizontalTiles)}px,${h}px, ${i * (w / horizontalTiles)}px)`,
              }}
              alt=""
              src={preview}
            />
          ))}
        </ScrollArea>
        <SimpleGrid cols={2}>
          <NumberInput
            min={1}
            onChange={(val) => setVerticalTiles(val || 0)}
            value={verticalTiles}
            label="Number of Vertical Tiles"
          />
          <NumberInput
            min={1}
            onChange={(val) => setHorizontalTiles(val || 0)}
            value={horizontalTiles}
            label="Number of Horizontal Tiles"
          />
        </SimpleGrid>
      </fieldset>
    );
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onSelectFile}
        onReject={() => showNotification({
          title: 'ERROR!',
          message: 'THIS FILE IS NOT TILEABLE',
          color: 'red',
        })}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <BiDownload size={50} color={theme.colors[theme.primaryColor][6]} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <BiError size={50} color={theme.colors.red[6]} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <BiCloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload Tileset</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop tileset here to upload. We can accept only <i>.png</i> and{' '}
            <i>.jpeg</i> files that are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
