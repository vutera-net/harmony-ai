import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test users
  const user1 = await prisma.user.upsert({
    where: { email: "test1@harmony.local" },
    update: {},
    create: {
      email: "test1@harmony.local",
      passwordHash: "hashed_password_placeholder",
      name: "Test User 1",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "test2@harmony.local" },
    update: {},
    create: {
      email: "test2@harmony.local",
      passwordHash: "hashed_password_placeholder",
      name: "Test User 2",
    },
  });

  // Create profiles for users
  const profile1 = await prisma.profile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      fullName: "Nguyen Van A",
      gender: "MALE",
      birthDate: new Date("1990-01-15"),
      birthTime: "14:30",
      birthTimezone: "Asia/Ho_Chi_Minh",
      birthLocation: "Ho Chi Minh City",
      energyType: "WATER",
    },
  });

  const profile2 = await prisma.profile.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      fullName: "Tran Thi B",
      gender: "FEMALE",
      birthDate: new Date("1995-06-20"),
      birthTime: "09:15",
      birthTimezone: "Asia/Ho_Chi_Minh",
      birthLocation: "Hanoi",
      energyType: "FIRE",
    },
  });

  // Create subscription for test users
  const sub1 = await prisma.subscription.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      plan: "FREE",
      status: "ACTIVE",
      startDate: new Date(),
    },
  });

  const sub2 = await prisma.subscription.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      plan: "AN_NHIEN",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      pdfGenerationQuota: 4,
    },
  });

  // Create sample charts
  const chart1 = await prisma.chart.create({
    data: {
      profileId: profile1.id,
      type: "TzVi",
      rawData: {
        year: 1990,
        month: 1,
        day: 15,
        hour: 14,
        minute: 30,
        stars: ["Thi Sao", "Quan Loc"],
        palaces: {
          menhoc: "Anh Lo",
          than_duc: "Co Chi",
        },
      },
      analysis: {
        summary: "User has strong career luck this year",
        energyScore: {
          metal: 20,
          wood: 25,
          water: 30,
          fire: 15,
          earth: 10,
        },
        suggestedActions: [
          "Focus on career development",
          "Maintain work-life balance",
        ],
      },
    },
  });

  // Create predictions for chart 1
  const pred1 = await prisma.prediction.create({
    data: {
      chartId: chart1.id,
      category: "Career",
      content: "Good opportunity for career advancement in next 3 months",
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isVerified: false,
    },
  });

  const pred2 = await prisma.prediction.create({
    data: {
      chartId: chart1.id,
      category: "Love",
      content: "Harmonious relationship period, good for long-term commitment",
      targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      isVerified: false,
    },
  });

  // Create sample journal entry
  const journal1 = await prisma.journalEntry.create({
    data: {
      userId: user1.id,
      eventDate: new Date(),
      content: "Got promoted at work today!",
      predictionId: pred1.id,
      status: "verified",
      verification:
        "Event aligns with career advancement prediction from 2 weeks ago",
      trustScore: 0.95,
    },
  });

  console.log("✅ Seeding complete!");
  console.log("📊 Created entities:");
  console.log(`  - Users: 2`);
  console.log(`  - Profiles: 2`);
  console.log(`  - Subscriptions: 2`);
  console.log(`  - Charts: 1`);
  console.log(`  - Predictions: 2`);
  console.log(`  - JournalEntries: 1`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
