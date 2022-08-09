require('dotenv').config();
const { StreamChat } = require('stream-chat')

main()

async function main() {
  const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY, process.env.REACT_APP_STREAM_SECRET)
  const response = await client.upsertUsers([
    { id: 'alfred', name: 'Alfred' },
    { id: 'benjamin', name: 'Benjamin' },
    { id: 'caroline', name: 'Caroline' },
    { id: 'deborah', name: 'Deborah' },
  ])
  console.log(response)
}
