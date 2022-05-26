exports.addUser = ({ id, name, room }) => {
  let users = []

  if (!name || !room) return { error: 'Name and room are required' }

  const user = { id, name, room }
  users.push(user)
  return { user }
}
