import './video.scss';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Video as VideoType } from '../../types/video.types';
import { db } from '../../lib/firebase';

interface VideoProps {
  videoId?: string;
}

export default function Video({
  videoId = 'Js1wtbsstrA',
}: Readonly<VideoProps>) {
  const [videos, setVideos] = useState<Array<VideoType>>([
    {
      id: videoId,
      videoId: videoId,
    },
  ]);

  const fetchVideos = async () => {
    await getDocs(collection(db, 'videos')).then((querySnapshot) => {
      const data: Array<VideoType> = [];

      querySnapshot.docs.forEach((doc) => {
        const video = {
          id: doc.id,
          videoId: doc.data().videoId,
        };

        data.unshift(video);
      });

      setVideos(data);
    });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      {videos.map((video: VideoType) => (
        <div key={video.videoId} className='ec-video'>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?si=pkmHYnTGjCcqhPYq`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </>
  );
}
