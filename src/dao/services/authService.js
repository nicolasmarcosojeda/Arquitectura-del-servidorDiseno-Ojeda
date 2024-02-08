import bcrypt from 'bcrypt';

const users = [
  { id: 1, username: 'marcosnicolass74', password: '$2b$10$XkzA2g8q9MFEjNOFbl51MeEso1VZlIgJmVpXwi12MFwGmkqD3HHwe', role: 'admin' },
  { id: 2, username: 'adminCoder', password: '$2b$10$QljdbuhN2wPXJ8gh8yeHTutkxcU8jGtV1wA07bMTt16aSmnvLkeoK', role: 'user' },
  
];

async function register(username, password) {
  // Hasheo de la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, username, password: hashedPassword, role: 'user' };
  users.push(user);
  console.log('Usuario registrado:', user);


  return user;
}

function authenticate(username, password) {
  const user = users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    return { id: user.id, username: user.username, role: user.role };
  }

  return null;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

export { register, authenticate, getUserById };
