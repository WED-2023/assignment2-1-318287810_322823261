// src/services/auth.js

export async function mockLogin(credentials, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!success) {
        reject({ status: 401, response: { data: { message: "Invalid credentials", success: false } } });
      } else {
        // Simulate successful login with a mock user
        const mockUser = {
          username: credentials.username,
          // Add more user details as needed
        };
        resolve({ status: 200, data: { username: mockUser.username, message: "login succeeded", success: true } });
      }
    }, 1000); // Simulate a 1-second delay
  });
}

export function mockRegister(userDetails, success = true) {
  if (!success) {
    throw { status: 409, response: { data: { message: "Username taken", success: false } } };
  }

  return { status: 200, response: { data: { message: "user created", success: true } } };
}

export function mockLogout() {
  return { status: 200, response: { data: { message: "logout succeeded", success: true } } };
}
