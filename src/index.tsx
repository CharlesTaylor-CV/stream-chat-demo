import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { getImage } from './assets';
import {useConnectUser} from './hooks/useConnectUser';
import type {StreamChatGenerics} from './types';
import {Chat} from 'stream-chat-react';

const apiKey = process.env.REACT_APP_STREAM_KEY;
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id') || '1';
const targetOrigin = urlParams.get('target_origin');
const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

const userToConnect: { id: string; image?: string } = {
  id: userId!,
  image: skipNameImageSet ? undefined : getImage(userId!),
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

function ChatApp() {
  const client = useConnectUser<StreamChatGenerics>(apiKey!, userToConnect);
  if (!client) return null
  return (
    <Chat client={client!} theme="messaging dark">
      <App targetOrigin={targetOrigin!} />
    </Chat>
  )
}

root.render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
