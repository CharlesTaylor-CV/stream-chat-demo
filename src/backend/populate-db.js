require('dotenv').config();
const { StreamChat } = require('stream-chat')

main()

async function main() {
  const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY, process.env.REACT_APP_STREAM_SECRET)
  // await createChannelTypes(client)

  const users = [
    { id: '1', name: 'Alfred', type: 'sem' },
    { id: '2', name: 'Benjamin', type: 'student'},
    { id: '3', name: 'Caroline', type: 'service-provider'},
    { id: '4', name: 'Deborah', type: 'student'},
  ]

  await client.upsertUsers(users)

  // Sem to student channels
  upsertChannelType(client, 'sem-user-to-student', {})
  for (let sem of users.filter(u => u.type === 'sem')) {
    for (let student of users.filter(u => u.type == 'student')) {
      // can set our own derivable channel id, but not recommended:
      // https://getstream.io/chat/docs/node/creating_channels/?language=javascript&q=conversations#2.-creating-a-channel-for-a-list-of-members
      await client.channel(
        'sem-user-to-student',
        {
          // Limits the users allowed to this list. Subscribes them to updates.
          // Without this array, the channel defaults to a "public" style wherein anyone
          // in our system is allowed to leave a message.
          members: [sem.id, student.id],
          created_by_id: sem.id,
          // custom metadata goes here:
          // foo: 'bar'
        }
      ).create()
    }
  }

  // SP to student channels
  upsertChannelType(client, 'service-provider-to-student', {})
  for (let sp of users.filter(u => u.type === 'service-provider')) {
    for (let student of users.filter(u => u.type == 'student')) {
      await client.channel(
        'service-provider-to-student',
        {
          members: [sp.id, student.id],
          created_by_id: sp.id,
        }
      ).create()
    }
  }
}

async function upsertChannelType(client, name, props) {
  try {
    await client.createChannelType({ name, ...props})
  }
  catch {
    await client.updateChannelType(name, props)
  }
}
