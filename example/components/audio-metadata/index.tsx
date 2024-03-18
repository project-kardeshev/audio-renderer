import React, {useState} from 'react';
import "./index.scss";

const metaAuthor = "James Martin";
const metaTitle = "Tomorrow is now";
const metaYear = "1988";

const AudioMeta = () => {
    return  (
        <div className="meta">
            <div className="meta-author">{metaAuthor}</div>
            <div className="meta-title">{metaTitle}</div>
            <div className="meta-year">{metaYear}</div>
        </div>
    );
};

export default AudioMeta;
