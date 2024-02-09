const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res, next) => {
    const user = await User.findOne(
        { where:
                {email: req.body.email}
        })
    if(!user) {
        return res.status(404).send({
            message: 'User not found'
        });
    }

    if(!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        });
    }

    const token = jwt.sign({id: user.id, role: user.user_role, curriculum: user.curriculum, studentYear: user.student_year, coordinating: user.coordinating}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.send({
        token
    });
});

router.post('/logout', (req,res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success',
    })
})

module.exports = router;