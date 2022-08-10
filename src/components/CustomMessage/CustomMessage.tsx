import { MessageUIComponentProps, MessageSimple } from 'stream-chat-react';

const CustomMessage = (props: MessageUIComponentProps) => {
  return <MessageSimple {...props} />;
};

export default CustomMessage;
