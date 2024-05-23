// models/user.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

// Добавим метод findUserByCredentials схеме пользователя,
// у него будет два параметра: почта и пароль
// models/user.js

userSchema.statics.findUserByCredentials = function(email, password) {
  // Попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель users
    .then(user => {
      if (!user) {
        // Не нашёлся — отклоняем промис
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      
      // Нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            return Promise.reject(new Error("Неправильные почта или пароль"));
          }

          return user; // Теперь user доступен
      });
  });
};

// userSchema.statics.findByIdAndUpdate = function(id, data) {
//   return this.updateOne({ _id: id }, data)
// }

// userSchema.statics.findByIdAndDelete = function(id) {
//   return this.deleteOne({ _id: id })
// }

module.exports = mongoose.model("user", userSchema);