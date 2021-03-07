import React from 'react'

const Remark = (props) => {
        let remark = ''
    if (props.score <= 100 && props.score >= 70) {
        remark = 'Excellent'
    
    } else if (props.score >= 60 && props.score <= 70) {
        remark = 'Good'
        
    } else if (props.score >= 50 && props.score <= 60) {
        remark = 'Pass'
    
    }
    else if (props.score >= 40 && props.scored <= 50) {
        remark = 'Poor'
    } else {
        remark = 'Fail'
    }
    return (
        <div>
            {remark}
        </div>
    )
}

export default Remark
