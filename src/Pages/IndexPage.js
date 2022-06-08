import { Box, Stack } from "@mui/material";
import ContentCard from "../Components/ContentCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function IndexPage() {
    const CardsStore = useSelector(state => state.Cards);
    const Filter = useSelector(state => state.Filter);
    const [Cards, setCards] = useState();
    useEffect(() => { //當全域變數更改時觸發重新Render
        setCards(CardsStore);
    }, [CardsStore]);

    //設置條件,當條件被更新時重新設置
    useEffect(() => {
        setCards(CardsStore); //清除所有條件
        if (Filter.isDone != null) { //設置是否要篩選已完成
            setCards(Cards => Cards.filter(Card => Card.isDone == Filter.isDone));
        }
        if (Filter.Title != null) { //設置是否要篩選標題
            setCards(Cards => Cards.filter(Card => Card.Title.includes(Filter.Title)));
        }
        if (Filter.Chips.length != 0) { //設置是否要篩選Chip_Tag
            // 將Filter的Chip_tag轉成 Array
            const tempCards = [];
            const FilterChipsArray = [];
            Filter.Chips.map((chip) => {
                FilterChipsArray.push(chip.Chip_tag);
            })
            // 將Card的Chip_tag轉成 Array
            Cards.map((Card) => {
                const CardChipsArray = [];
                Card.Chips.map((chip) => {
                    CardChipsArray.push(chip.Chip_tag);
                })
                // 確認Filter的每個chip 都有在Card裡
                const Card_Vali = FilterChipsArray.every((filter_chip) => {
                    return CardChipsArray.includes(filter_chip);
                });
                if (Card_Vali) {
                    tempCards.push(Card);
                    setCards(tempCards);
                }
            })
        }
        console.log("Filter Now", Filter);
    }, [Filter])

    return (
        <Box sx={{
            flexGrow: 10,
            width: "auto",
            height: 80,
            // backgroundColor: "#ffffff",
        }}>
            <Stack direction="column" spacing={1.5}
                sx={{
                    alignItems: "center",
                    overflowY: "scroll",
                    height: "100%",
                }}>

                {Cards ?
                    Cards.map((Card) => { //map出每一個代辦事項
                        return <ContentCard key={Card.id} Card={Card} />
                    })
                    :
                    null}
            </Stack>
        </Box>
    );
}

export default IndexPage;

