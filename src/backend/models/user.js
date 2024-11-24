module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Ensures the value is a valid email
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('issuer', 'holder', 'checker'),
            allowNull: false,
        },
        ethereumAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^0x[a-fA-F0-9]{40}$/, // Regex to validate Ethereum address format
            },
        },
    });

    return User;
};
