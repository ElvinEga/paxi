import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  stream,
  isAudioMute,
  name,
}: {
  stream: MediaStream;
  isAudioMute: boolean;
  name: string;
}) => {
  const myStream = name === "My Stream" ? true : false;
  return (
    <div
      className={`${
        name === "My Stream"
          ? "flex flex-col w-full items-center justify-center z-10"
          : "px-2"
      }`}
    >
      <div
        className={`relative rounded-xl overflow-hidden
                 ${myStream ? " w-full mt-16" : "w-full "}`}
      >
        <ReactPlayer
          url={stream}
          playing
          muted={isAudioMute}
          height="100%"
          width="100%"
          style={{ transform: "scaleX(-1)" }}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 rounded-md px-4 py-2 text-white">
          <div className="font-semibold text-xs">{name}</div>
          <div className=" text-gray-300 text-xs">Host</div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
