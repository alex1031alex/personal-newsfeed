import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
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

import { FC } from 'react';

const drawerWidth = 300;

export const Admin: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Админ-панель
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Партнерские статьи" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom>
              Редактирование статьи Как мыть руки правильно
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="success" sx={{ mr: 1 }}>
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
                  <MenuItem onClick={handleClose}>Удалить статью</MenuItem>
                </Menu>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Компания" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Название" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline maxRows={4} label="Подводка" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline maxRows={12} label="Текст" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Card>
              <CardActionArea>
                <CardMedia component="img" height="140" image="https://placeimg.com/640/480/any" alt="green iguana" />
                <CardContent>
                  <input type="file" />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant="h4" gutterBottom>
              Партнерские статьи
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="success">
                Добавить новую
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <Grid item xs={3} key={item}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://placeimg.com/640/480/any"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
