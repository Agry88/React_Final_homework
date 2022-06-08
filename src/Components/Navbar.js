import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useDispatch , useSelector } from "react-redux";
import { SetFilter } from "../Actions"

export default function Navbar() {
  const [anchorEl1, setAnchorEl1] = React.useState(null); {/* 設置兩個用來控制Menu開關的State */}
  const [anchorEl2, setAnchorEl2] = React.useState(null); 

  const dispatch = useDispatch();
  const Filter = useSelector(state => state.Filter); {/* 引入現有的篩選條件 */}

  {/* HandleModal開關 */}
  const handleMenu_ = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose_ = () => {
    setAnchorEl1(null);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };

    {/* 當點選顯示全部時將篩選條件中控制是否已完成的欄位設成Null */}
  const handleSetFilter = () => {
    dispatch(SetFilter(
      {
        ...Filter,
        isDone: null
      }
    ));
    handleClose_();
  };



  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static" sx={{ height: "100%", display: "flex", justifyContent: "center" }}>
        <Toolbar>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu_} //點即時開啟Menu
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl1)} //控制Menu開關
              onClose={handleClose_} //關閉時觸發更改Menu開關
            >
              <MenuItem onClick={handleSetFilter}>顯示全部</MenuItem> {/* 點擊時觸發篩選函式 */}
            </Menu>
          </div>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            我ㄉ學期末Todo清單
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu} //點即時開啟Menu
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <Avatar alt="Cheng yang" src="./Img/me.jpg" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl2)} //控制Menu開關
              onClose={handleClose} //關閉時觸發更改Menu開關
            >
              <MenuItem onClick={handleClose}>學號:C109156135</MenuItem>
              <MenuItem onClick={handleClose}>姓名:翁誠陽</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}