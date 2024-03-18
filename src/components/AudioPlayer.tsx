import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { LoadStateEnum, ReactAudioWave, LoadStateEnumType, InstanceMethodType } from "react-audio-wave";
import TimeDuration from "./time-duration";
import Placeholder from "./placeholder";
import VolumeSlider from "./volume-slider";
import { timeFormat as timeFormatFunc, validTxid } from "../utils";
import AudioMeta from "./audio-metadata";
import * as mm from 'music-metadata-browser'

const waveHeight = 50;
const colors = {
    waveColor: "#d8d8d8",
    progressColor: "#2b8423",
    cursorColor: "#2b8423",
};

const downloadAudio = (audioSrc: string) => {
    window.open(audioSrc, "_parent");
};

const parseMetadata = async (audioSrc: string) => {
    const metadata = await mm.fetchFromUrl(audioSrc)
    return metadata
}

const AudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
    const [paused, setPaused] = useState<boolean>(true);
    const [playbackRate, setPlaybackRate] = useState<string>("1.0");
    const [loadState, setLoadState] = useState<LoadStateEnumType>(LoadStateEnum.INIT);
    const audioWaveRef = useRef<InstanceMethodType>(null);
    const durationRef = useRef<number>();
    const timeDurationRef = useRef<{ changeCurrentTime: (current: number) => void }>(null);
    const [metadata, setMetadata] = useState<{ author: string, title: string, year: string, coverUrl: string }>({
        author: "unknown author",
        title: "unknown title",
        year: "unknown year",
        coverUrl: ""
    });

    useEffect(() => {
        if (validTxid(audioSrc)) {
            parseMetadata(audioSrc).then((metadata) => {
                console.log(metadata)
                setMetadata({
                    author: metadata.common.artist ?? "unknown artist",
                    title: metadata.common.title ?? "unknown title",
                    year: metadata.common.year?.toString() ?? "unknown year",
                    coverUrl: URL.createObjectURL(new Blob([metadata.common.picture?.[0].data]))
                })
            })
        }
    }, [audioSrc])


    const onChangeLoadState = useCallback((state: LoadStateEnumType, duration?: number) => {
        setLoadState(state);
        if (state === LoadStateEnum.SUCCESS) {
            durationRef.current = duration;
        }
    }, [audioSrc]);

    const onPlayEnded = useCallback(() => {
        setPaused(true);
    }, [audioSrc]);

    const onCurrentTimeChange = useCallback((current: number) => {
        timeDurationRef.current?.changeCurrentTime(current);
    }, [audioSrc]);


    const onChangeVolume = useCallback((volume: number) => {
        if (audioWaveRef.current?.volume)
            audioWaveRef.current?.volume(volume);
    }, [audioSrc]);

    const timeFormat = useCallback((seconds: number) => {
        return timeFormatFunc(seconds, "hh:mm:ss");
    }, [audioSrc]);

    const changePlaybackRate = (rate: string) => {
        setPlaybackRate(rate);
        if (audioWaveRef.current?.playbackRate)
            audioWaveRef.current.playbackRate(Number(rate));
    };

    const playPause = () => {
        setPaused((bool: boolean) => !bool);
        if (paused && audioWaveRef.current?.play) {
            audioWaveRef.current?.play();
            return;
        }
        if (audioWaveRef.current?.pause)
            audioWaveRef.current?.pause();
    };

    return (
        <div className="audio-player">
            {loadState === LoadStateEnum.SUCCESS ? (
                <div className="audio-controls">
                    <span
                        onClick={playPause}
                        className={classNames("iconfont", "icon-switch-play", {
                            "icon-pause": !paused,
                            "icon-play": paused,
                        })}
                    />
                    <div className="audio-meta">
                        <AudioMeta author={metadata?.author} title={metadata?.title} year={metadata.year} coverUrl={metadata?.coverUrl} />

                    </div>
                    {/*
                    <span
                        className={classNames("iconfont icon-circledownload", "icon-download")}
                        onClick={downloadAudio}
                    />*/}

                </div>
            ) : null}
            <ReactAudioWave
                supportPlaybackRate
                className="audio-wave-container"
                ref={audioWaveRef}
                waveHeight={waveHeight}
                colors={colors}
                audioSrc={audioSrc}
                onChangeLoadState={onChangeLoadState}
                onCurrentTimeChange={onCurrentTimeChange}
                onPlayEnded={onPlayEnded}
                timeFormat={timeFormat}
                placeholder={Placeholder}
            />
            {loadState === LoadStateEnum.SUCCESS ? (
                <div className="audio-controls">
                    <span
                        className={classNames("iconfont icon-circledownload", "icon-download")}
                        onClick={() => downloadAudio(audioSrc)}
                    />
                    <select
                        value={playbackRate}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            changePlaybackRate(event.target.value);
                        }}
                        className="audio-rate"
                    >
                        <option value="0.5">0.5</option>
                        <option value="1.0">Normal</option>
                        <option value="1.5">1.5</option>
                        <option value="2.0">2.0</option>
                    </select>

                    <TimeDuration ref={timeDurationRef} className="audio-time" duration={durationRef.current} />
                    <VolumeSlider onChangeVolume={onChangeVolume} className="volume-slider" />
                </div>
            ) : null}
        </div>
    );
};

export default AudioPlayer;
