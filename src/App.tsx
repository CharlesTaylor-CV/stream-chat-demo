import { Channel, ChannelList, ChannelPreviewMessenger, useChatContext } from 'stream-chat-react';

import '@stream-io/stream-chat-css/dist/css/index.css';
import './index.css';

import {
  CustomMessage,
  MessagingChannelListHeader,
  MessagingThreadHeader,
} from './components';

import { ChannelInner } from './components/ChannelInner/ChannelInner';
import { useUpdateAppHeightOnResize } from './hooks/useUpdateAppHeightOnResize';
import { useMobileView } from './hooks/useMobileView';
import { GiphyContextProvider } from './Giphy';


const App = () => {
  const toggleMobile = useMobileView();
  const { client } = useChatContext();

  useUpdateAppHeightOnResize();

  return (
    <div className="dark">
      <div className='messaging__sidebar' id='mobile-channel-list' onClick={toggleMobile}>
        <MessagingChannelListHeader />
        <ChannelList
          filters={{ members: { $in: [client.user!.id] }}}
          options={{ state: true, watch: true, presence: true, limit: 8 }}
          sort={{ last_message_at: -1, updated_at: -1 }}
          Preview={(props) => {
            const otherMember = Object.values(props.channel.state.members)
              .find(m => m?.user_id !== client.user!.id)
            const user = otherMember?.user as any
            return (
              <ChannelPreviewMessenger {...props} displayTitle={`${user.name} (${user.type})`} />
            )
          }}
        />
      </div>
      <div>
        <Channel
          maxNumberOfFiles={10}
          Message={CustomMessage}
          multipleUploads={true}
          ThreadHeader={MessagingThreadHeader}
        >
          <GiphyContextProvider>
            <ChannelInner toggleMobile={toggleMobile} />
          </GiphyContextProvider>
        </Channel>
      </div>
    </div>
  );
};

export default App;
