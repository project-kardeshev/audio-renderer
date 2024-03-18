import "./index.scss";


const AudioMeta = ({ author, title, year, coverUrl }: { author: string, title: string, year: string, coverUrl: string }) => {

    return (
        <div className="meta">
            <div className="text">
                <div className="meta-author">{author}</div>
                <div className="meta-title">{title}</div>
                <div className="meta-year">{year}</div>
            </div>
            <img className="meta-cover" src={coverUrl} alt="Album cover" />
        </div>
    );
};

export default AudioMeta;
