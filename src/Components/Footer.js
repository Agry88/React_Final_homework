import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Box, Button, IconButton } from "@mui/material";
import { SetFilter } from "../Actions";
import Modal from "@mui/material/Modal";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddCard_Modal from "./AddCard_Modal";

function Footer() {
    // 設置State用以控制Modal開關
    const [Modal_state, setModal_state] = useState(false);
    const handleClose = () => setModal_state(false);
    const handleOpen = () => setModal_state(true);
    // 取得現有的篩選條件
    const Filter = useSelector(state => state.Filter);

    const dispatch = useDispatch();
    const handleSetFilter = (DoneValue) => { //將篩選條件中的是否已完成設置為變數(T/F)
        dispatch(SetFilter(
            {
                ...Filter,
                isDone:DoneValue
            }
        ));
    }

    return (
        <Box
            sx={{
                width: "auto",
                height: 80,
                backgroundColor: "#ffffff",
                display: 'flex',
                alignContent: "center",
                justifyContent: "space-around",
                borderTop: 1,
                borderColor: '#bebfc2',
            }}>
            <Button variant="text" size="large" fullWidth={true} onClick={() => handleSetFilter(true)} sx={{
                color: "#747578",
                ':hover': {
                    color: '#99aff2',
                },
            }}>
                <DoneIcon />
                已完成清單
            </Button>

            <IconButton aria-label="AddIcon" size="large" sx={{
                m: "0.5rem",
                height: "4rem",
                width: "4rem",
                backgroundColor: "#1976d2",
                color: "white",
                ':hover': {
                    backgroundColor: "#1976d2",
                    color: '#99aff2',
                },
            }}
                onClick={handleOpen} //點擊時開啟新增待辦事項Modal
            >
                <AddIcon fontSize="inherit" />
            </IconButton>

            <Button variant="text" size="large" fullWidth={true} onClick={() => handleSetFilter(false)} sx={{
                color: "#747578",
                ':hover': {
                    color: '#99aff2',
                },
            }}>
                <CloseIcon />
                未完成清單
            </Button>
            <Modal
                open={Modal_state} //State為True時開啟Modal
                onClose={handleClose}
            >
                <div><AddCard_Modal handleClose={handleClose}/></div>
            </Modal>
        </Box>
    );
}

export default Footer;


