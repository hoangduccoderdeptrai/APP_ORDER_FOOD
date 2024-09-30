export const FormData =[
    {
        lable:'Title',
        name:'title',
        componentType:'input',
        type:'text',
        placeholder:'Enter item title'
    },{
        lable:'Description',
        name:'description',
        componentType:'textarea',
        placeholder:'Enter item description'
    },{
        lable:'Category',
        name:'category',
        componentType:'select',
        options:[
            {
                id:'fastFood',
                label:'FastFood'
            },{
                id:'seafood',
                label:'Seafood'
            },{
                id:'fruit_vegetables',
                label:'Fruits and Vegetables'
            },{
                id:'GrilledDishes',
                label:'Grilled Dished'
            },{
                id:'other',
                lable:'Other'
            }
        ]
    }
]