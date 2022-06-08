import React, { useEffect } from 'react'
import { Button, Card, Typography, Stack } from "@mui/material"
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";
import { SetFilter } from "../Actions"

export default function Detail_Card(props) {
    const dispatch = useDispatch();
    const Filter = useSelector(state => state.Filter); //取出現有篩選條件

    const AllCardsData = useSelector(state => state.Cards);
    const [chipData, setChipData] = React.useState([]); //用以存放所有代辦事項的Tag
    const [SelectedchipData, setSelectedchipData] = React.useState(Filter.Chips); //用以存放以用來篩選的Tag

    useEffect(() => {
        const tempChipData = []; // 用以存放所有Chip的Obj 含Id和Chip_tag名稱
        const tempChipnameData = []; //用以存放Chip_tag 用來篩選
        AllCardsData.map((CardData) => { //取出所有Tag
            CardData.Chips.map((chip) => {
                if (tempChipnameData.includes(chip.Chip_tag)) { //不會重複Tag ex:兩個代辦事項都有公事tag時只會顯示一個
                    return
                }
                else {
                    tempChipnameData.push(chip.Chip_tag); //沒有重複時推入暫存放Array
                    tempChipData.push({
                        id: tempChipnameData.length,
                        Chip_tag: chip.Chip_tag
                    });
                }
            })
        })
        setChipData(tempChipData); //所有Card的Tag都跑過後將暫存放Array收集到的Tag放入State
    }, [AllCardsData])


    const handleDelete = (chipToDeleteid, chipToDeletetag) => { 
        setChipData((chips) => chips.filter((chip) => chip.id !== chipToDeleteid)); //刪除在本陣列的該Tag
        setSelectedchipData([...SelectedchipData, { id: chipToDeleteid, Chip_tag: chipToDeletetag }]) //將該Tag加入到另一邊的陣列
    };

    const handleSelectDelete = (chipToDeleteid, chipToDeletetag) => {
        const getLastChipData = chipData[chipData.length-1].id; //取出另外一邊陣列的最後值，避免衝突
        setSelectedchipData((chips) => chips.filter((chip) => chip.id !== chipToDeleteid)); //刪除在本陣列的該Tag
        setChipData([...chipData, { id: getLastChipData+1, Chip_tag: chipToDeletetag }]) //將該Tag加入到另一邊的陣列
    }

    const handleSearchbyTag = () => { //將要用以篩選到的Tag放入篩選條件中
        dispatch(SetFilter(
            {
                ...Filter,
                Chips:SelectedchipData
            }
        ));
        props.handleClose(); //篩選後關閉Modal
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
                <Typography variant="h4">根據現有標籤進行篩選</Typography>
                <Typography variant="h6">以選標籤</Typography>
                <Stack direction="row" spacing={2} sx={{ pb: 3, pt: 2 }}>
                    {SelectedchipData //防呆
                        ?
                        SelectedchipData.map((chip) => {
                            return <Chip
                                key={chip.id}
                                label={chip.Chip_tag}
                                sx={{ minWidth: "5rem", height: "2.5rem", fontSize: 20 }}
                                onDelete={() => handleSelectDelete(chip.id, chip.Chip_tag)}
                            />
                        })
                        :
                        null
                    }
                </Stack>

                <Divider sx={{ bgcolor: "#b7bdb9" }} />

                <Typography variant="h6" sx={{ pt: 3, pb: 2 }}>未選標籤</Typography>
                <Stack direction="row" spacing={2} > 
                    {chipData //防呆
                        ?
                        chipData.map((chip) => {
                            return <Chip key={chip.id} color="primary" label={chip.Chip_tag} sx={{ minWidth: "5rem", height: "2.5rem", fontSize: 20 }} onClick={() => handleDelete(chip.id, chip.Chip_tag)} />
                        })
                        :
                        null
                    }
                </Stack>

                <Divider sx={{ mt: 5 , mb:5 , bgcolor: "#b7bdb9" }} />

                <Button sx={{ float: "right", width: "7rem", height: "3rem", fontSize: 20 }} variant="contained" onClick={handleSearchbyTag}>篩選</Button>

            </CardContent>
        </Card>
    );
}