import User from '../models/User.js';

export const signupcontroller = async (req, res) => {
  const { username, password, email,role } = req.body;

  try {
    // Check if the user already exists with the provided username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      password, 
      email,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const LogInUsers = async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // If the user does not exist, return an error
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the stored password
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // If the credentials are valid, return a success message
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}