const initialState = [
    {
        id: '1',
        Title: "Paper 1 Report",
        isDone: false,
        Content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, omnis aliquid. Eius reprehenderit debitis voluptatum omnis? Deleniti provident consequatur aut asperiores repudiandae eum dicta, fugiat vel neque. In incidunt similique accusamus debitis voluptatum ducimus. Minima, architecto tenetur voluptatem incidunt, expedita beatae ipsa illo necessitatibus mollitia fugit facilis quod sit vel provident numquam accusantium! Facilis, repellendus! Non optio quas id impedit sint voluptatem repellendus, porro distinctio deleniti repudiandae quibusdam similique, nobis perspiciatis animi. Odit natus sapiente labore consectetur tempore provident nobis molestias rem! Maxime, facilis eum, maiores itaque, incidunt at officia aliquam voluptatibus beatae dolores eligendi possimus vitae ipsam exercitationem odio.",
        Chips: [
            {
                id: 1,
                Chip_tag: "公事",
            },
            {
                id: 2,
                Chip_tag: "私事",
            },
        ],
    },
    {
        id: '2',
        Title: "Paper 2 Report",
        isDone: false,
        Content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, omnis aliquid. Eius reprehenderit debitis voluptatum omnis? Deleniti provident consequatur aut asperiores repudiandae eum dicta, fugiat vel neque. In incidunt similique accusamus debitis voluptatum ducimus. Minima, architecto tenetur voluptatem incidunt, expedita beatae ipsa illo necessitatibus mollitia fugit facilis quod sit vel provident numquam accusantium! Facilis, repellendus! Non optio quas id impedit sint voluptatem repellendus, porro distinctio deleniti repudiandae quibusdam similique, nobis perspiciatis animi. Odit natus sapiente labore consectetur tempore provident nobis molestias rem! Maxime, facilis eum, maiores itaque, incidunt at officia aliquam voluptatibus beatae dolores eligendi possimus vitae ipsam exercitationem odio.",
        Chips: [
            {
                id: 1,
                Chip_tag: "私事",
            },
            {
                id: 2,
                Chip_tag: "公事",
            },
        ],
    },
    {
        id: '3',
        Title: "Paper 3 Report",
        isDone: true,
        Content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, omnis aliquid. Eius reprehenderit debitis voluptatum omnis? Deleniti provident consequatur aut asperiores repudiandae eum dicta, fugiat vel neque. In incidunt similique accusamus debitis voluptatum ducimus. Minima, architecto tenetur voluptatem incidunt, expedita beatae ipsa illo necessitatibus mollitia fugit facilis quod sit vel provident numquam accusantium! Facilis, repellendus! Non optio quas id impedit sint voluptatem repellendus, porro distinctio deleniti repudiandae quibusdam similique, nobis perspiciatis animi. Odit natus sapiente labore consectetur tempore provident nobis molestias rem! Maxime, facilis eum, maiores itaque, incidunt at officia aliquam voluptatibus beatae dolores eligendi possimus vitae ipsam exercitationem odio.",
        Chips: [
            {
                id: 1,
                Chip_tag: "很棒的事",
            },
            {
                id: 2,
                Chip_tag: "超棒的事",
            },
        ],
    },
]

const Cards = (state = initialState, action) => {
    switch (action.type) {
        case "SetCard":
            const newState = action.newCards;
            return newState;

        default:
            return state
    }
}
export default Cards;