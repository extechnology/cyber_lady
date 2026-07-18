import axiosInstance from "../../../api/axiosInstance";
import type { VideoGallery } from "../types/types.videos";

const getVideoGallery = async ():Promise<VideoGallery[]> => {
    const response = await axiosInstance.get<VideoGallery[]>("video-gallery/")
    return response.data

}

export default getVideoGallery