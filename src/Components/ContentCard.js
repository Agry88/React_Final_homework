import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, Typography, CardContent, Stack, Button, Modal } from "@mui/material";
import Chip from "@mui/material/Chip";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "./EditModal";
import { SetCard } from "../Actions";

export default function ContentCard(props) {
    // 用以存放基本資訊
    const [Title, setTitle] = useState(props.Card.Title);
    const [isDone, setisDone] = useState(props.Card.isDone);
    const [Content, setContent] = useState(props.Card.Content);
    const [Chips, setChips] = useState(props.Card.Chips);
    const CardsData = useSelector(state => state.Cards);
    const dispatch = useDispatch();
    // 當父元件的全域變數更新時props也會更新，設置useEffect更改State
    useEffect(() => {
        setTitle(props.Card.Title);
        setisDone(props.Card.isDone);
        setContent(props.Card.Content);
        setChips(props.Card.Chips);
    }, [props])
    // 用以控制Modal開關
    const [Modal_state, setModal_state] = useState(false);
    const handleClose = () => setModal_state(false);
    const handleOpen = () => setModal_state(true);

    const handleDeleteCard = () => { //觸發時刪除該待辦事項
        const newCards = CardsData.filter((Card) => Card.id != props.Card.id);
        dispatch(SetCard(newCards));
    }

    const handleSetisDone = () => { //點擊時更改該待辦事項是否已完成狀態
        const newCards = CardsData.map((Card) => ({
            ...Card,
            isDone: Card.id == props.Card.id ? !Card.isDone : Card.isDone
        }))
        setisDone(!isDone);
        dispatch(SetCard(newCards));
    }

    return (
        <Card variant="outlined" sx={{
            width: '90%',
            height: '10rem',
            minHeight: "10rem"
        }}>
            <CardContent>
                <Typography variant="h5" component="div"> {/*在此處設定標題*/}
                    {Title}
                    <Button variant="text" sx={{ float: "right" }} onClick={handleSetisDone}>
                        {isDone
                            ? <PlaylistRemoveIcon />
                            : <PlaylistAddCheckIcon />
                        }
                        {isDone
                            ? "標註為未完成"
                            : "標註為已完成"
                        }
                    </Button>
                </Typography>

                <Box
                    component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        mb: 1,
                        p: 1,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        height: "3rem",
                        borderRadius: 2,
                    }}
                    color="text.secondary"
                > {/*在此處設定內容*/}
                    {Content}
                </Box>
                <Box
                    component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        height: "2rem",
                        borderRadius: 2,
                    }}
                    color="text.secondary"
                >
                    <Stack direction="row" spacing={1}>
                        {/*在此處設定標籤*/}
                        {Chips ?
                            Chips.map((Chip_) => {
                                return <Chip key={Chip_.id} label={Chip_.Chip_tag} variant="outlined" size="medium" />
                            })
                            :
                            null}
                    </Stack>
                </Box>
                <Button variant="text" sx={{ float: "right", top: "-2rem" }} onClick={handleDeleteCard}>
                    <DeleteIcon />
                </Button>
                <Button variant="text" sx={{ float: "right", top: "-2rem" }} onClick={handleOpen}> {/* 點擊時觸發更改Modal */}
                    <EditIcon />
                </Button>
                <Modal
                    open={Modal_state}
                    onClose={handleClose}
                >
                    <div><EditModal Card={props.Card} handleClose={handleClose} /></div>
                </Modal>
            </CardContent>
        </Card>
    );
}


