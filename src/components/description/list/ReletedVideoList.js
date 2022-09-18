import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReletedVideoListItem from "./ReletedVideoListItem";
import { fetchReletedVideos } from "../../../features/reletedVideos/reletedVideosSlice";
import Loading from "../../ui/Loading";

export default function ReletedVideoList({ currentVideoId, tags }) {
  const { reletedVideos, isLoading, isError, error } = useSelector((state) => state.reletedVideos || {});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReletedVideos({ tags, id: currentVideoId }));
  }, [dispatch, tags, currentVideoId]);

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <div className="col-span-12">{error}</div>;

  if (!isLoading && !isError && reletedVideos?.length === 0) {
    content = <div className="col-span-12">No releted videos found!</div>;
  }

  if (!isLoading && !isError && reletedVideos?.length > 0) {
    content = reletedVideos.map((video) => <ReletedVideoListItem key={video.id} video={video} />);
  }

  return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
    {content}
  </div>;
}
