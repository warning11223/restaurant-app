import i1 from '../static/images/i1.png'
import f1 from '../static/images/f1.png'
import c3 from '../static/images/c3.png'
import fi1 from '../static/images/fi1.png'


export const categories = [
    {
        id: 1,
        name: "Chicken",
        urlParamName: "chicken",
    },
    {
        id: 2,
        name: "Curry",
        urlParamName: "curry",
    },
    {
        id: 3,
        name: "Rice",
        urlParamName: "rice",
    },
    {
        id: 4,
        name: "Fish",
        urlParamName: "fish",
    },
    {
        id: 5,
        name: "Fruits",
        urlParamName: "fruits",
    },
    {
        id: 7,
        name: "Deserts",
        urlParamName: "deserts",
    },
    {
        id: 8,
        name: "Soft Drinks",
        urlParamName: "drinks",
    },
];

export const foodItemsStatic = [
    {
        id: "1647820416809",
        calories: "120",
        category: "chicken",
        imageURL: c3,
        price: "10",
        title: "Chicken Kebab",
        qty: 1,
    },
    {
        id: "1647820581313",
        calories: "100",
        category: "chicken",
        imageURL: fi1,
        price: "8.5",
        title: "Spicy Chilly Cheese Pasta",
        qty: 1,
    },
    {
        id: "1647820625440",
        calories: "60",
        category: "chicken",
        imageURL: c3,
        price: "12.5",
        title: "Pepper Max Noodles",
        qty: 1,
    },
    {
        id: "1647821206472",
        calories: "80",
        category: "chicken",
        imageURL: f1,
        price: "8.5",
        title: "Chicken Fried Rice",
        qty: 1,
    },
    {
        id: "1647821596820",
        calories: "100",
        category: "fish",
        imageURL: i1,
        price: "12.5",
        title: "Overnight Marinated Fish",
        qty: 1,
    },
];

export const heroData = [
    {id: 1, name: 'Ice cream', desc: 'Chocolate & vanilla', price: '5.25', imageSrc: i1},
    {id: 2, name: 'Strawberries', desc: 'Fresh strawberries', price: '10.25', imageSrc: f1},
    {id: 3, name: 'Chicken kebab', desc: 'Mixed kebab plate', price: '8.25', imageSrc: c3},
    {id: 4, name: 'Fish', desc: 'Mixed fish', price: '7.25', imageSrc: fi1},
]