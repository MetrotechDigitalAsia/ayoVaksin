import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Title({ ...props }) {

    return (
        props.isHeader ?
            <Typography variant="h6" align="left" color="secondary"><b>{props.mainTitle}</b></Typography>
            :
            <div>
                <Typography variant="h6" align="left" color="secondary"><b>{props.mainTitle}</b></Typography>
                <Typography variant="caption" display="block" align="left">{props.subTitle}</Typography>
            </div>
    )
}
