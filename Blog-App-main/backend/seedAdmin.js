const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

// CONNECT DATABASE
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@blogapp.com" });

    if (adminExists) {
      console.log("✓ Admin user already exists!");
      console.log("\nLogin Credentials:");
      console.log("Email: admin@blogapp.com");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@blogapp.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("✓ Admin user created successfully!");
    console.log("\nLogin Credentials:");
    console.log("Email: admin@blogapp.com");
    console.log("Password: admin123");
    console.log("\nAdmin ID:", adminUser._id);

    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
