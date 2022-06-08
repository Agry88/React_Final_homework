import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Collapse, Stack } from "@mui/material"
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import { SetFilter } from "../Actions";
import Detail_Card from "./Detail_Card";

function Detail() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); // 設置用以控制展開列的State
    const [Modal_state, setModal_state] = useState(false); //設置用以控制Modal的State
    const [Title, setTitle] = useState(); //用以收集使用者欲搜尋的標題
    const Filter = useSelector(state => state.Filter);

    // 處理Handle開關事件
    const handleClick = () => setOpen(!open);
    const handleClose = () => setModal_state(false);
    const handleOpen = () => setModal_state(true);

    const handleSetTilte = (e) => {
        setTitle(e.target.value);
    }
    // 觸發時將搜尋條件加上標題條件
    const handleSearchbyTitle = () => {
        dispatch(SetFilter(
            {
                ...Filter,
                Title: Title
            }
        ));
    }

    return (
        <Box
            sx={{
                flexGrow: 0.1,
                py: 1
            }}>
            <Stack direction="row" alignItems="center" spacing={5}>
                <Button variant="contained" onClick={handleClick}
                    sx={{
                        height: "100%",
                        left: "2.5rem",
                        boxShadow: 0,
                        background: 'inherit',
                        color: "#2674eb",
                        '&:hover': {
                            backgroundColor: 'inherit',
                            color: '#3c52b2',
                            boxShadow: 0,
                        },
                    }}>
                    <ArrowDropDownCircleIcon sx={{ width: "1.5rem", height: "1.5rem" }} />
                    <Typography variant="h6">
                        點選篩選條件
                    </Typography>
                </Button>
                <Collapse orientation="horizontal" in={open}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="根據標題作搜尋"
                            onChange={handleSetTilte}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchbyTitle}>
                            <SearchIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleOpen}> {/* 點選時開啟Modal篩選Chip */}
                            <ExpandMoreIcon />
                        </IconButton>
                    </Paper>
                </Collapse>
            </Stack>
            <Modal
                open={Modal_state}
                onClose={handleClose}
            >
                <div>
                    <Detail_Card handleClose={handleClose}/> {/* 觸發時開啟篩選Chip的Modal */}
                </div>
            </Modal>
        </Box>
    );
}

export default Detail;

