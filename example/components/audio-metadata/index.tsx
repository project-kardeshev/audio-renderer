import React, {useState} from 'react';
import "./index.scss";

const metaAuthor = "James Martin";
const metaTitle = "Tomorrow is now";
const metaYear = "1988";
const metaCover = "https://upload.wikimedia.org/wikipedia/en/9/92/%C3%81g%C3%A6tisByrjunCover.JPG";

const AudioMeta = () => {
    return  (
        <div className="meta">
            <div className="text">
                <div className="meta-author">{metaAuthor}</div>
                <div className="meta-title">{metaTitle}</div>
                <div className="meta-year">{metaYear}</div>
            </div>
            <img className="meta-cover" src={metaCover} alt="Album cover" />
        </div>
    );
};

export default AudioMeta;
