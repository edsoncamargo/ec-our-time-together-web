import './audio-player.scss';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Video } from '../../types/video.types';
import { db } from '../../lib/firebase';

interface AudioPlayerProps {
  videoId?: string;
}

export default function AudioPlayer({
  videoId = 'OnSnZ7CGPz0',
}: Readonly<AudioPlayerProps>) {
  const [videos, setVideos] = useState<Array<Video>>([
    {
      id: videoId,
      videoId: videoId,
    },
  ]);

  const fetchVideos = async () => {
    await getDocs(collection(db, 'audio-player')).then((querySnapshot) => {
      const data: Array<Video> = [];

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
      {videos.map((video: Video) => (
        <div key={video.videoId} className='ec-audio-player' data-aos='fade-up'>
          <h1 className='ec-norican ec-norican--overflow'>nossa música.</h1>

          <iframe
            style={{ width: '100%', height: '100px', border: 'none' }}
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&loop=1&playlist=${video.videoId}`}
            title='YouTube video player'
            allow='autoplay; encrypted-media'
            aria-label='Audio player for YouTube video'
          ></iframe>
        </div>
      ))}
    </>
  );
}
