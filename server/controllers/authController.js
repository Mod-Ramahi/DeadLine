const Freelancer = require('../models/freeelancer');
const jwtUtils = require('../utils/jwtUtils');
const { loginSchema, registerSchema, emailSchema, newPassSchema } = require('../utils/validation');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    await loginSchema.validate({ email, password });

    const user = await Freelancer.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await (
      rememberMe ?
        jwtUtils.generateLongLivedToken({ id: user._id, email: user.email })
        :
        jwtUtils.generateToken({ id: user._id, email: user.email })
    );
    console.log(token)
    res.status(200).json({ id: user._id, email: user.email, name: user.name, avatar: user.avatar, token });
  } catch (error) {
    res.status(500).json({ message: 'failed sign in', error: error.message });
  }
}
const signup = async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1
  const day = currentDate.getDate();
  try {
    const { name, email, password, rememberMe } = req.body;
    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) {
      console.log('email exist', res.status)
      return res.status(409).json({ message: "Email already exists" });
    };
    await registerSchema.validate({ email, password, name });
    console.log(email)

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new freelancer
    const newFreelancer = new Freelancer({
      name,
      email,
      provider: 'email',
      password: hashedPassword,
      rememberMe,
      // skills:[],
      // hourlyRate,
      // category:'',
      // proname:'',      
      // avatar,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      joined: `${year}-${month}-${day}`,
      // country,
      // countryFlag,
      // type:'user'
    });
    await newFreelancer.save();
    const user = await Freelancer.findOne({ email });
    const token = await (rememberMe ?
      jwtUtils.generateLongLivedToken({ id: user._id, email: user.email })
      :
      jwtUtils.generateToken({ id: user._id, email: user.email }));
    res.status(201).json({ id: user._id, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
};

const goolgeSignIn = async (req, res) => {
  try {
    const { name, email, rememberMe } = req.body
    // const email = UserObject.email;
    // const name = UserObject.name;
    const exist = await Freelancer.findOne({ email })
    if (!exist) {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1
        const day = currentDate.getDate();
        const newFreelancer = new Freelancer({
          name,
          email,
          provider: 'google',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          joined: `${year}-${month}-${day}`,
          rememberMe
        })
        await newFreelancer.save()
        const user = await Freelancer.findOne({ email })
        const token = await jwtUtils.generateToken({ id: user._id, email: user.email })
        res.status(201).json({ id: user._id, email: user.email, token })
      } catch (error) {
        res.status(500).json({ message: 'error signing up user', error: error.message })
      }
    }
    else {
      try {
        const token = await jwtUtils.generateToken({ id: user._id, email: user.email });
        res.status(200).json({ id: exist._id, email: exist.email, name: exist.name, token })
      } catch (error) {
        res.status(500).json({ message: 'error signing in user', error: error.message })
      }
    }
  } catch (error) {
    console.log('error:', error)
  }
}
const completeRegister = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the Authorization header
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User authentication failed' });
    }
    const UserId = req.user.id;
    console.log('userID:', UserId);
    const { businessType, proNickname, profileImg, maincategory, skillsSelected } = req.body;
    const user = await Freelancer.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    user.proname = proNickname;
    user.userType = businessType;
    user.avatar = profileImg;
    user.category = maincategory;
    user.skills = skillsSelected;

    await user.save();

    res.status(200).json({ message: 'registration complete' });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'error completing registration', error: error.message })
  }
}
const editEmail = async (req, res) => {
  const token = req.headers.authorization;
  try {
    if (!token || !req.user || !req.user.id) {
      return res.status(401).json({ message: 'authintication error' })
    }
    const user = await Freelancer.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }
    const newEmail = req.body.newEmail
    await emailSchema.validate({ newEmail })
    if (newEmail) {
      user.email = newEmail
    }
    await user.save()
    res.status(200).json({ message: 'email updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'updating email failed', error: error.message })
  }
}
const editUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token || !req.user || !req.user.id) {
      return res.status(401).json({ message: 'authintication error' })
    }
    const user = await Freelancer.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    const { newPassword, currentPass, userBalance, planId } = req.body;
    if (newPassword && currentPass) {
      await newPassSchema.validate({ password: newPassword })
      const isPasswordValid =  bcrypt.compare(currentPass, user.password)
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save();
        res.status(200).json({ message: 'successfull update' })
      } else {
        return res.status(400).json({ message: 'password does not match' })
      }
    }
    const userBalanceParse =  parseFloat(userBalance)
    if(!isNaN(userBalanceParse) && userBalanceParse > 0){
      user.balance += userBalanceParse
      await user.save()
      res.status(200).json({message: 'balance edited successfully'})
    }
    if(planId) {
      user.membershipID = planId
      await user.save()
      res.status(200).json({message:'successfully subscribed to the membership'})
    }
  } catch (error) {
    res.status(500).json({ message: 'error updating user info', error: error.message })
  }
}

module.exports = { login, signup, completeRegister, editUser, editEmail, goolgeSignIn };
