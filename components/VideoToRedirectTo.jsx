import axios from "axios";
import React, { useEffect, useState } from "react";

function VideoToRedirectTo() {
  const [videoLink, setVideoLink] = useState({ _id: "", link: "" });

  useEffect(() => {
    const getVideoLink = async () => {
      const response = await axios.get("/api/videoLink");
      console.log(response.data.link);
      if (!response) return;
      setVideoLink(response.data);
    };

    getVideoLink();
  }, []);

  const updateVideoLink = async () => {
    const response = await axios.put("/api/videoLink", {
      VideoLink: videoLink,
    });
    if (!response) return;

    setVideoLink({ ...videoLink, link: "" });
  };

  return (
    <div className="px-2 flex items-end max-w-[35rem] mx-auto  space-x-1 text-slate-600 h-[5rem]">
      <div className="flex flex-col flex-1 ">
        <p className="font-bold">Video Link</p>
        <input
          className="w-full bg-slate-200 p-2 py-1 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          type="text"
          value={videoLink.link}
          onChange={e => setVideoLink({ ...videoLink, link: e.target.value })}
        />
      </div>
      <button
        className="bg-blue-500 text-white min-w-[3rem] py-1 w-[25%] rounded-md hover:bg-blue-400"
        onClick={updateVideoLink}
      >
        Update Link
      </button>
    </div>
  );
}

export default VideoToRedirectTo;
