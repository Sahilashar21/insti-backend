// backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createUsers() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://sahilashar21:LOBqKPV3GcmxNEsJ@cluster0.qbnh7lv.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0");

  // College UID-based users
  const users = [
    { name: "Sahil Ashar", email: "23BSD004", password: "password123", role: "user" },
    { name: "Sanubi Mehak", email: "23BSD003", password: "password123", role: "user" },
    { name: "Shubham Sikakul", email: "23BSD037", password: "password123", role: "user" },
    { name: "Pankaj Raina", email: "23BSD045", password: "password123", role: "user" },
    { name: "Bhakti Bagal", email: "23BSD005", password: "password123", role: "user" },
    { name: "Ritesh Pal", email: "23BSD023", password: "password123", role: "user" },
    { name: "Admin1", email: "admin@gmail.com", password: "password123", role: "admin" },
    { name: "Admin12 ", email: "admin22@gmail.com", password: "password123", role: "admin" },
    { name: "clerk", email: "clerk@gmail.com", password: "password123", role: "clerk" }
  ];

  for (let u of users) {
    const exists = await User.findOne({ email: u.email });
    if (exists) {
      console.log(`⚠️ User with UID ${u.email} already exists, skipping...`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(u.password, 10);
    const newUser = new User({
      name: u.name,
      email: u.email, // storing UID in email field
      password: hashedPassword,
      role: u.role,
    });

    await newUser.save();
    console.log(`✅ Created ${u.role}: ${u.email} / ${u.password}`);
  }

  mongoose.disconnect();
}

createUsers();
