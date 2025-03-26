const bcrypt = require('bcrypt');

// ✅ MongoDB से hashed पासवर्ड डालें (यह वही होना चाहिए जो db.users.find() में दिख रहा है)
const hashedPassword = "$2a$10$P9r5QvVrNdkQh5jeokbdl.cps5P64xDUWIXkCRPD6.P2qquuAO0dq"; 

// ✅ अब वही पासवर्ड डालें जो आपने रजिस्ट्रेशन के समय यूज़ किया था
const passwordsToTry = ["123456", "password", "test123", "654321", "admin", "JohnDoe123"]; // अपने हिसाब से एडिट करें

// 🔹 अब हम हर पासवर्ड को चेक करेंगे
passwordsToTry.forEach(async (enteredPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  console.log(`🔍 Testing Password: ${enteredPassword} => ${isMatch ? "✅ MATCH" : "❌ NOT MATCH"}`);
});
