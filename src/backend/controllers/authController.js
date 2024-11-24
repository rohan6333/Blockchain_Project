const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Web3 = require('web3');

require('dotenv').config();

const web3 = new Web3();

exports.register = async (req, res) => {
    const { email, password, role, ethereumAddress } = req.body;

    try {
        const validRoles = ['issuer', 'holder', 'checker'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role provided' });
        }

        if (ethereumAddress && !web3.utils.isAddress(ethereumAddress)) {
            return res.status(400).json({ message: 'Invalid Ethereum address' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const user = await db.User.create({
            email,
            password: hashedPassword,
            role,
            ethereumAddress,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error('Error in user registration:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Email or Ethereum address already exists' });
        } else {
            res.status(500).json({ message: 'Registration failed. Please try again later.' });
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                ethereumAddress: user.ethereumAddress,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
