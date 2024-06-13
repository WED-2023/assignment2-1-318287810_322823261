// src/services/auth.js

// In-memory store for registered users
const registeredUsers = [];

export function mockLogin(username, password, success = true) {
  // Check if already logged in
  if (!success) {
    throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
  }

  // Check if the user exists and the password matches
  const user = registeredUsers.find(user => user.username === username);
  if (!user || user.password !== password) {
    throw { status: 401, response: { data: { message: "Invalid username or password", success: false } } };
  }

  // If all checks pass, return a success message
  return { status: 200, response: { data: { message: "login succeeded", success: true } } };
}

export function mockRegister(userDetails, success = true) {
  const { username, email, password } = userDetails;

  // Check if the username is already taken
  const userExists = registeredUsers.some(user => user.username === username);
  if (userExists) {
    throw { status: 409, response: { data: { message: "Username taken", success: false } } };
  }

  // Add the new user to the registeredUsers array
  registeredUsers.push({ username, email, password });

  if (!success) {
    throw { status: 409, response: { data: { message: "Registration failed", success: false } } };
  }

  return { status: 200, response: { data: { message: "user created", success: true } } };
}

export function mockLogout() {
  return { status: 200, response: { data: { message: "logout succeeded", success: true } } };
}
