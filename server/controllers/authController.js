const Freelancer = require('../models/freeelancer');
const jwtUtils = require('../utils/jwtUtils');
const { loginSchema, registerSchema } = require('../utils/validation');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      await loginSchema.validate({ email, password });
      
      const user = await Freelancer.findOne({ email });
      
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = await jwtUtils.generateToken({ id: user._id, email: user.email });
        console.log(token)
        res.status(200).json({id:user._id, email:user.email,name:user.name, avatar:user.avatar, token});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const signup = async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1
  const day = currentDate.getDate();
    try {
      const { name, email, password, skills, hourlyRate, bio, avatar,country,countryFlag,type } = req.body;
        await registerSchema.validate({ email,password, name });
        console.log(email,password)
        const existingFreelancer = await Freelancer.findOne({ email });
        if (existingFreelancer) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new freelancer
        const newFreelancer = new Freelancer({
      name,
      email,
      password:hashedPassword,
      skills,
      hourlyRate,
      bio,
      avatar,
      timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
      joined:`${year}-${month}-${day}`,
      country,
      countryFlag,
      type
    });
    await newFreelancer.save();
    const user = await Freelancer.findOne({ email });
    const token = await jwtUtils.generateToken({ id: user._id, email: user.email });
    res.status(201).json({id:user._id, email:user.email, token});
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
};

module.exports = { login, signup };
