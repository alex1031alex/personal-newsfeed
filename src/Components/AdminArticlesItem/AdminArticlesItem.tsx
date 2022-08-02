import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbar from '@mui/material/Snackbar';
import { ChangeEvent, FC, FormEvent, useRef, useState, useEffect } from 'react';
import { InputName, InputRefs, InputValues, InputErrors } from './types';
import { getErrors, getImage } from './helpers';
import {
  createPartnersArticle,
  getPartnersArticle,
  updatePartnersArticle,
  deletePartnersArticle,
  uploadFile,
} from '../../../api';

export const AdminArticlesItem: FC = () => {
  const { id }: { id?: string } = useParams();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeSnackbar = () => {
    setSnackbarMessage(null);
  };

  const inputRefs: InputRefs = {
    'company-name': useRef<HTMLInputElement>(null),
    title: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
    text: useRef<HTMLTextAreaElement>(null),
    image: useRef<HTMLInputElement>(null),
  };

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });
  const [inputValues, setInputValues] = useState<InputValues>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = evt.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // 1. Собрать данные
    const data: FormData = new FormData();

    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value);
    });

    // 2. Проверить данные
    const errors = await getErrors(Array.from(data.entries()) as [InputName, FormDataEntryValue][]);
    const errorEntries = Object.entries(errors);

    setInputErrors(errors);

    const errorInput = errorEntries.find(([, value]) => value.length > 0);

    if (errorInput) {
      const name = errorInput[0] as InputName;
      const inputRef = inputRefs[name];

      if (inputRef.current) {
        inputRef.current.focus();
      }

      return;
    }

    if (id) {
      updatePartnersArticle(id, inputValues)
        .then(() => {
          setSnackbarMessage('✔ Статья обновлена!');
        })
        .catch((error: Error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    } else {
      createPartnersArticle(inputValues)
        .then(() => {
          setSnackbarMessage('✔ Статья создана!');
        })
        .catch((error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    }
  };

  const showFile = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.currentTarget.files;
    const imageContainer = document.querySelector('.image-container');

    if (imageContainer) {
      imageContainer.innerHTML = '';
    }

    if (files === null || !files.length) {
      return;
    }

    const file = files[0];

    if (file.size === 0 || !file.type.startsWith('image')) {
      return;
    }

    const image = await getImage(file);

    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение должно быть минимум 200х200',
      });

      return;
    }

    try {
      const url = await uploadFile(file);

      setInputValues({
        ...inputValues,
        image: url,
      });
    } catch (error: any) {
      setSnackbarMessage(`❌ ${error.message}`);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!id) {
      return;
    }

    deletePartnersArticle(id)
      .then(() => {
        setSnackbarMessage('✔ Статья удалена!');
      })
      .catch((error) => {
        setSnackbarMessage(`❌ ${error.message}`);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      const data = await getPartnersArticle(id);

      setInputValues({
        'company-name': data['company-name'],
        title: data.title,
        description: data.description,
        text: data.text,
        image: data.image,
      });
    })();
  }, [id]);

  return (
    <Box component={'form'} noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            {id ? inputValues.title : `Новая статья`}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="success" sx={{ mr: 1 }}>
              Сохранить
            </Button>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {id && <MenuItem onClick={() => deleteArticle(id)}>Удалить статью</MenuItem>}
              </Menu>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Компания"
                variant="outlined"
                value={inputValues['company-name']}
                name="company-name"
                onChange={onChangeInput}
                ref={inputRefs['company-name']}
                error={Boolean(inputErrors['company-name'].length)}
                helperText={inputErrors['company-name']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название"
                variant="outlined"
                name="title"
                value={inputValues.title}
                onChange={onChangeInput}
                ref={inputRefs.title}
                error={Boolean(inputErrors.title.length)}
                helperText={inputErrors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                name="description"
                label="Подводка"
                variant="outlined"
                value={inputValues.description}
                onChange={onChangeInput}
                ref={inputRefs.description}
                error={Boolean(inputErrors.description.length)}
                helperText={inputErrors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={12}
                name="text"
                label="Текст"
                variant="outlined"
                value={inputValues.text}
                onChange={onChangeInput}
                ref={inputRefs.text}
                error={Boolean(inputErrors.text.length)}
                helperText={inputErrors.text}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="140" image={inputValues.image} alt="" />
              <CardContent>
                <TextField
                  type="file"
                  name="image"
                  fullWidth
                  maxRows={12}
                  variant="outlined"
                  onChange={showFile}
                  ref={inputRefs.image}
                  error={Boolean(inputErrors.image.length)}
                  helperText={inputErrors.image}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={typeof snackbarMessage === 'string'}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};
