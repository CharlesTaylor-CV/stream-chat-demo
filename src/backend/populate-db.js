const { StreamChat } = require('stream-chat')
console.log(process.env.REACT_APP_STREAM_KEY, process.env.REACT_APP_STREAM_SECRET)
const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY, process.env.REACT_APP_STREAM_SECRET)
const token = client.createToken(process.env.REACT_APP_USER_ID);

client.upsertUsers([
  { 'id': 'alfred' },
  { 'id': 'benjamin' },
  { 'id': 'caroline' },
  { 'id': 'deborah' },
])
