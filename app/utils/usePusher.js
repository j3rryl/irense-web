"use client"
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const usePusher = () => {
    const [notification, setNotification] = useState('')
    useEffect(() => {
      const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_APP_KEY}`, {
        cluster: 'mt1',
        encrypted: true,
      });
      const channel = pusher.subscribe('irense');
      channel.bind('my-event', function(data) {
          setNotification(data)
          toast.info(data?.message, 
            {
                autoClose: 20000
            })
      });
      return () => {
        pusher.unsubscribe('irense');
      };
    }, []);
  return {};
};

export default usePusher;
