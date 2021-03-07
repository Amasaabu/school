import React from 'react'

const Item = (props) => {
    return (
            <th>{props.item}</th>
    )
}



// const Item = (props) => {
//     if (props.key == score) {
//         if (props.score > 60) {
//             return
//         }
//     }
//     return (
//         <th>{props.item}</th>
//     )
// }

export default Item
