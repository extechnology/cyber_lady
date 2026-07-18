import { useRef } from "react";
import useVideos from "../../features/video_gallery/hooks/useVideos";

const VideoGallery = () => {
  const { data: videosApi, isLoading } = useVideos();

  const activeVideos = videosApi?.filter((video) => video.is_active);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const toggleVideo = (id: number) => {
    const video = videoRefs.current[id];

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="w-full px-1 py-5 md:px-4 ">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-5xl pb-4 text-center font-medium text-gray-800">Enjoy Every Moment</h1>
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-2 mt-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-md bg-stone-800 shadow-lg animate-pulse"
              >
                <div className="relative aspect-9/16 overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="h-4 w-3/4 rounded bg-stone-600/50 mb-1"></div>
                    <div className="h-4 w-1/2 rounded bg-stone-600/50"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            activeVideos?.map((video) => (
              <div
                key={video.id}
                className="group overflow-hidden rounded-md bg-black shadow-lg"
              >
                <div
                  className="relative aspect-9/16 cursor-pointer overflow-hidden"
                  onClick={() => toggleVideo(video.id)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[video.id] = el;
                    }}
                    className="h-full w-full object-cover"
                    src={video.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Bottom Gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-3">
                    <h3 className="line-clamp-2 text-sm font-medium text-white">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
