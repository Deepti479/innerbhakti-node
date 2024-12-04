const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./models/Program');
const Track = require('./models/Track');

dotenv.config();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/innerbhakti';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => console.error('Database connection error:', err));

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Program.deleteMany({});
    await Track.deleteMany({});

    // Create tracks
    const track1 = await Track.create({
      name: 'Morning Meditation',
      audioUrl: 'https://example.com/audio/morning.mp3',
      duration: 600,
    });

    const track2 = await Track.create({
      name: 'Evening Relaxation',
      audioUrl: 'https://example.com/audio/evening.mp3',
      duration: 900,
    });

    // Create programs
    await Program.create({
      name: 'Daily Spiritual Practices',
      description: 'A program to guide your daily spiritual journey.',
      imageUrl: 'https://example.com/images/spiritual.jpg',
      tracks: [track1._id, track2._id],
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Run seed script
seedDatabase();
