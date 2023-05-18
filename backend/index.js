const express = require('express');
const mongoose = require('mongoose');
const UserCustomization = require('./Model');
const User=require('./UserModel')
const cors =require('cors')
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Parse JSON request body
app.use(express.json());
app.use(cors())


const db="mongodb+srv://lavaformama:sarita70@cluster0.oenp3ec.mongodb.net/FormData?retryWrites=true&w=majority"
mongoose.connect(db).then(()=>{
console.log("Mongodb connected")
}).catch((err)=>console.log("NO connected",err))


//signup signin
app.post('/signup', async (req, res) => {
  const { name,email, password } = req.body;
console.log(name,email,password)

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name,email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Signin route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password,"signin")

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'No user exist' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    // Update user token in the database
    user.token = token;
    await user.save();

    res.json({ message: 'Signin successful', token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});



app.post('/customizations', async (req, res) => {
  console.log(req.body, "request");
  const { userId, headerColor, headerBackColor, bubbleColor, message1, firstmessgae,botfontcolor } = req.body;
  console.log(userId, headerColor, headerBackColor, bubbleColor, message1, firstmessgae,botfontcolor, "post");

  try {
      let customization = await UserCustomization.findOne({ userId });

      if (customization) {
          customization.headerColor = headerColor;
          customization.headerBackColor = headerBackColor;
          customization.bubbleColor = bubbleColor;
          customization.heading = message1;
          customization.startmessage = firstmessgae;
          customization.botfontcolor=botfontcolor;

      } else {
          customization = new UserCustomization({
              userId: userId,
              headerColor: headerColor,
              headerBackColor: headerBackColor,
              bubbleColor: bubbleColor,
              heading: message1,
              startmessage: firstmessgae,
              botfontcolor:botfontcolor,
          });
      }

      await customization.save();
      console.log('User customization created or updated successfully');
      res.status(201).json({ message: 'User customization created or updated' });
  } catch (error) {
      console.error('Error creating or updating user customization:', error);
      res.status(500).json({ error: 'Failed to create or update user customization' });
  }
});

  // GET route to fetch user customization
  app.get('/customizations/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const customization = await UserCustomization.findOne({ userId: userId });
      console.log('User customization retrieved:', customization);
      
      if (customization) {
        res.json(customization);
      } else {
        res.status(404).json({ error: 'User customization not found' });
      }
    } catch (error) {
      console.error('Error fetching user customization:', error);
      res.status(500).json({ error: 'Failed to fetch user customization' });
    }
  });
  
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
