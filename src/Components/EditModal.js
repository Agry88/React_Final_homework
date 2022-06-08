import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { SetCard } from "../Actions";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardContent, Button, Chip } from "@mui/material";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function EditModal(props) {
    // 用以存放使用者於輸入框輸入的資訊
    const [Title, setTitle] = useState(props.Card.Title);
    const [Content, setContent] = useState(props.Card.Content);
    const [isDone, setisDone] = useState(props.Card.isDone);
    const [chipTag, setchipTag] = useState("");
    const [chipData, setchipData] = useState(props.Card.Chips);

    const dipatch = useDispatch();
    const Cards = useSelector(state => state.Cards); //取得全域變數代辦事項用以新增
    // 處理Handle輸入事項
    const handleSetTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleSetchipTag = (e) => {
        setchipTag(e.target.value);
    }

    const handleSetContent = (e) => {
        setContent(e.target.value);
    }

    const handleSetisDone = (e) => {
        setisDone(!isDone);
    }

    const handleChipAdd = () => {
        let lastChipid = 0;
        if (chipData.length == 0) {
            lastChipid += 1
        }
        else {
            lastChipid = (chipData[chipData.length - 1].id) + 1
        }
        setchipData([...chipData, { id: lastChipid, Chip_tag: chipTag }])
    }

    const handleChipDelete = (chipToDeleteid) => {
        setchipData((chips) => chips.filter((chip) => chip.id !== chipToDeleteid));
    }
    
    const handleEditTodo = () => { //將使用者編輯的事項回傳至全域變數
        const lastTodoid = Number(Cards[Cards.length - 1].id) + 1
        const newTodo = Cards.map((Card) => ({
            ...Card,
            Title: (Card.id == props.Card.id) ? Title : Card.Title,
            Content: (Card.id == props.Card.id) ? Content : Card.Content,
            isDone: (Card.id == props.Card.id) ? isDone : Card.isDone,
            Chips: (Card.id == props.Card.id) ? chipData : Card.Chips,
        }));
        dipatch(SetCard(newTodo));
        console.log("newTodo", newTodo);
        props.handleClose();
    }

    return (
        <Card
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',
                width: "90%",
                minHeight: "20rem",
                bgcolor: 'background.paper',
                p: 1,
            }}>
            <CardContent>
                {/* Title Start */}
                <Typography variant="h4" sx={{ pb: 3 }}>
                    修改代辦清單
                </Typography>
                {/* Title End */}

                <Divider sx={{ mb: 3, bgcolor: "#b7bdb9" }} />

                {/* Edit Basic Data Start */}
                <Typography sx={{ pb: 2 }} variant="h5">修改基本資訊</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField
                        required
                        id="outlined-required"
                        label="標題"
                        defaultValue={Title}
                        onChange={handleSetTitle}
                    />
                    <Button variant="text" sx={{ float: "right" }} onClick={handleSetisDone}>
                        {isDone //根據是否已完成處理出現的文字及圖案
                            ? <PlaylistRemoveIcon />
                            : <PlaylistAddCheckIcon />
                        }
                        {isDone
                            ? "標註為未完成"
                            : "標註為已完成"
                        }
                    </Button>
                </Stack>

                <Box
                    component="div"
                    sx={{
                        mb: 1,
                        pt: 3,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        borderRadius: 2,
                    }}
                    color="text.secondary"
                > {/*在此處設定內容*/}
                    <TextField
                        required
                        id="outlined-required"
                        label="備註"
                        multiline
                        fullWidth
                        defaultValue={Content}
                        onChange={handleSetContent}
                    />
                </Box>
                {/* Edit Basic Data End */}
                <Divider sx={{ mt: 3, mb: 3, bgcolor: "#b7bdb9" }} />
                {/* Edit Chip Data Start */}
                <Typography sx={{ pb: 2 }} variant="h5">修改標籤</Typography>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        id="AddChipTag"
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="新增標籤"
                        onChange={handleSetchipTag}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleChipAdd}>
                        <ArrowDownwardIcon />
                    </IconButton>
                </Paper>
                <Box
                    component="div"
                    sx={{
                        height: "2rem",
                        borderRadius: 2,
                        pb: 3,
                    }}
                    color="text.secondary"
                >
                    <Stack direction="row" spacing={1}>
                        {/*在此處設定標籤*/}
                        {chipData.map((Chip_) => {
                            return <Chip key={Chip_.id} color="primary" label={Chip_.Chip_tag} 
                            sx={{ minWidth: "5rem", height: "2.5rem", fontSize: 20 }} 
                            onClick={() => handleChipDelete(Chip_.id)} />
                        })}
                    </Stack>
                </Box>
                {/* Edit Chip Data End */}

                <Divider sx={{ mt: 3, mb: 3, bgcolor: "#b7bdb9" }} />

                <Button sx={{ float: "right", width: "7rem", height: "3rem", fontSize: 20 }} variant="contained" onClick={handleEditTodo}>修改</Button>
            </CardContent>
        </Card >
    );
}