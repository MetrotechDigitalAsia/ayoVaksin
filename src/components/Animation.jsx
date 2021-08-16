import React from "react";
import Lottie from 'react-lottie';

export default function Animation({ ...props }) {
    const { isStopped, json, loop, autoplay, width, height, preserveAspectRatio, style } = props;
    const defaultOptions = {
        loop,
        autoplay,
        animationData: json,
        rendererSettings: {
            preserveAspectRatio,
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            height={height}
            width={width}
            style={{ marginTop: 0, ...style }}
            isStopped={isStopped}
        />
    );
}

Animation.defaultProps = {
    width: 100,
    height: 100,
    preserveAspectRatio: 'xMidYMid slice'
}