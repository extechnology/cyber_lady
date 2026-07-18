import getVideoGallery from "../api/getVideos";
import { useQuery } from "@tanstack/react-query";


const useVideos = () => {
    return useQuery({
        queryKey: ["video-gallery"],
        queryFn: getVideoGallery,
    })
}

export default useVideos