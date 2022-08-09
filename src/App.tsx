import { Chat, Channel, ChannelList } from 'stream-chat-react';

import '@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';

import {
  CustomMessage,
  MessagingChannelList,
  MessagingChannelListHeader,
  MessagingInput,
  MessagingThreadHeader,
} from './components';

import { ChannelInner } from './components/ChannelInner/ChannelInner';
import { useConnectUser } from './hooks/useConnectUser';
import { useTheme } from './hooks/useTheme';
import { useChecklist } from './hooks/useChecklist';
import { useUpdateAppHeightOnResize } from './hooks/useUpdateAppHeightOnResize';
import { useMobileView } from './hooks/useMobileView';
import { GiphyContextProvider } from './Giphy';
import type { StreamChatGenerics } from './types';

type AppProps = {
  apiKey: string;
  userToConnect: { id: string; name?: string; image?: string };
  userToken: string | undefined;
  targetOrigin: string;
};

const App = (props: AppProps) => {
  const { apiKey, userToConnect, userToken, targetOrigin } = props;

  const chatClient = useConnectUser<StreamChatGenerics>(apiKey, userToConnect, userToken);
  const toggleMobile = useMobileView();
  const theme = useTheme(targetOrigin);

  useChecklist(chatClient, targetOrigin);
  useUpdateAppHeightOnResize();


  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  return (
    <Chat client={chatClient} theme={`messaging ${theme}`}>
      <div className='messaging__sidebar' id='mobile-channel-list' onClick={toggleMobile}>
        <MessagingChannelListHeader theme={theme} />
        <ChannelList
          filters={{ members: { $in: [userToConnect.id] }}}
          options={{ state: true, watch: true, presence: true, limit: 8 }}
          sort={{ last_message_at: -1, updated_at: -1 }}
          List={MessagingChannelList}
        />
      </div>
      <div>
        <Channel
          Input={MessagingInput}
          maxNumberOfFiles={10}
          Message={CustomMessage}
          multipleUploads={true}
          ThreadHeader={MessagingThreadHeader}
          TypingIndicator={() => null}
        >
          <GiphyContextProvider>
            <ChannelInner theme={theme} toggleMobile={toggleMobile} />
          </GiphyContextProvider>
        </Channel>
      </div>
    </Chat>
  );
};

export default App;
