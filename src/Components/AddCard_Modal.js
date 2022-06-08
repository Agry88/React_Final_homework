import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { SetCard } from "../Actions";
import { Box, Button, Divider, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function AddCard_Modal(props) {
    //用以存放使用者輸入的資訊
    const [Title, setTitle] = useState("請輸入標題");
    const [Content, setContent] = useState("請輸入備註");
    const [isDone, setisDone] = useState(true);
    const [chipTag, setchipTag] = useState("請輸入欲新增標籤"); //此為Chip輸入框文字
    const [chipData, setchipData] = useState([]); //此為使用者增加的Chip Array
    const Cards = useSelector(state => state.Cards); //取得現有的代辦事項用以新增

    const dispatch = useDispatch();
    // 處理Handle事項
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

    const handleChipAdd = () => { //觸發時新增至Chip Array
        let lastChipid = 0;
        if (chipData.length == 0) {
            lastChipid += 1
        }
        else {
            lastChipid = (chipData[chipData.length - 1].id) + 1
        }
        setchipData([...chipData, { id: lastChipid, Chip_tag: chipTag }])
    }

    const handleChipDelete = (chipToDeleteid) => { //處理刪除Chip
        setchipData((chips) => chips.filter((chip) => chip.id !== chipToDeleteid));
    }

    const handleAddTodo = () => { //將欲新增資訊新增至全域變數的代辦事項中
        const lastTodoid = Number(Cards[Cards.length - 1].id) + 1
        const newTodo = [...Cards, {
            id: lastTodoid,
            Title: Title,
            isDone: isDone,
            Content: Content,
            Chips: chipData,
        }]
        dispatch(SetCard(newTodo));
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
                <Typography sx={{ pb: 2 }} variant="h4">新增待辦事項</Typography>

                <Divider sx={{ mb: 3, bgcolor: "#b7bdb9" }} />

                <Typography sx={{ pb: 2 }} variant="h5">新增基本資訊</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField
                        required
                        id="outlined-required"
                        label="標題"
                        placeholder="請輸入標題"
                        onChange={handleSetTitle}
                    />
                    <FormControlLabel control={<Checkbox defaultChecked />} label={isDone ? "以完成" : "未完成"} onChange={handleSetisDone} />
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
                        placeholder="請輸入備註"
                        onChange={handleSetContent}
                    />
                </Box>

                <Divider sx={{ mt: 3, mb: 3, bgcolor: "#b7bdb9" }} />

                <Typography sx={{ pb: 2 }} variant="h5">新增標籤</Typography>
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

                <Stack direction="row" spacing={2}>
                    {chipData
                        ?
                        chipData.map((chip) => {
                            return <Chip key={chip.id} color="primary" label={chip.Chip_tag} sx={{ minWidth: "5rem", height: "2.5rem", fontSize: 20 }} onClick={() => handleChipDelete(chip.id)} />
                        })
                        :
                        null
                    }
                </Stack>

                <Divider sx={{ mt: 3, mb: 3, bgcolor: "#b7bdb9" }} />

                <Button sx={{ float: "right", width: "7rem", height: "3rem", fontSize: 20 }} variant="contained" onClick={handleAddTodo}>新增</Button>
            </CardContent>
        </Card >
    );
}
