const users = [
  { id: 1, username: 'marcosnicolass74', password: 'QSAno7IW9o8iCocA', role: 'admin' },
  { id: 2, username: 'adminCoder', password: 'adminCod3r123', role: 'user' },
  // ... otros usuarios
];

function authenticate(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  return user ? { id: user.id, username: user.username, role: user.role } : null;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

export { authenticate, getUserById };
