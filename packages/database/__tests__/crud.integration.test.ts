import { PrismaClient } from "@prisma/client";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

const prisma = new PrismaClient();

describe("Database CRUD Operations", () => {
  beforeAll(async () => {
    // Clean up before tests
    await prisma.journalEntry.deleteMany({});
    await prisma.prediction.deleteMany({});
    await prisma.chart.deleteMany({});
    await prisma.subscription.deleteMany({});
    await prisma.profile.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("User CRUD", () => {
    it("should create a user", async () => {
      const user = await prisma.user.create({
        data: {
          email: "create.test@harmony.local",
          passwordHash: "hashed_pwd",
          name: "Create Test User",
        },
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe("create.test@harmony.local");
    });

    it("should read a user by email", async () => {
      const created = await prisma.user.create({
        data: {
          email: "read.test@harmony.local",
          passwordHash: "hashed_pwd",
        },
      });

      const read = await prisma.user.findUnique({
        where: { email: "read.test@harmony.local" },
      });

      expect(read?.id).toBe(created.id);
    });

    it("should update a user", async () => {
      const created = await prisma.user.create({
        data: {
          email: "update.test@harmony.local",
          passwordHash: "hashed_pwd",
          name: "Original Name",
        },
      });

      const updated = await prisma.user.update({
        where: { id: created.id },
        data: { name: "Updated Name" },
      });

      expect(updated.name).toBe("Updated Name");
    });

    it("should delete a user", async () => {
      const created = await prisma.user.create({
        data: {
          email: "delete.test@harmony.local",
          passwordHash: "hashed_pwd",
        },
      });

      await prisma.user.delete({ where: { id: created.id } });

      const deleted = await prisma.user.findUnique({
        where: { id: created.id },
      });

      expect(deleted).toBeNull();
    });
  });

  describe("Profile CRUD", () => {
    let userId: string;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: { email: "profile.test@harmony.local", passwordHash: "pwd" },
      });
      userId = user.id;
    });

    it("should create a profile", async () => {
      const profile = await prisma.profile.create({
        data: {
          userId,
          fullName: "Test User Profile",
          gender: "MALE",
          birthDate: new Date("1990-01-15"),
          birthTime: "14:30",
          birthTimezone: "Asia/Ho_Chi_Minh",
          birthLocation: "HCMC",
        },
      });

      expect(profile.userId).toBe(userId);
      expect(profile.fullName).toBe("Test User Profile");
    });

    it("should read profile with user relation", async () => {
      const profile = await prisma.profile.findUnique({
        where: { userId },
        include: { user: true },
      });

      expect(profile?.user.email).toBe("profile.test@harmony.local");
    });

    it("should update profile energy type", async () => {
      const updated = await prisma.profile.update({
        where: { userId },
        data: { energyType: "WATER" },
      });

      expect(updated.energyType).toBe("WATER");
    });
  });

  describe("Chart & Prediction CRUD", () => {
    let profileId: string;
    let chartId: string;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: { email: "chart.test@harmony.local", passwordHash: "pwd" },
      });
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          gender: "FEMALE",
          birthDate: new Date("1995-06-20"),
        },
      });
      profileId = profile.id;
    });

    it("should create a chart with raw data", async () => {
      const chart = await prisma.chart.create({
        data: {
          profileId,
          type: "TzVi",
          rawData: {
            year: 1995,
            month: 6,
            day: 20,
            stars: ["Thi Sao", "Quan Loc"],
          },
        },
      });

      expect(chart.profileId).toBe(profileId);
      expect(chart.type).toBe("TzVi");
      expect((chart.rawData as any).stars).toContain("Thi Sao");
      chartId = chart.id;
    });

    it("should create predictions for a chart", async () => {
      const pred = await prisma.prediction.create({
        data: {
          chartId,
          category: "Career",
          content: "Good year for work advancement",
          targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });

      expect(pred.chartId).toBe(chartId);
      expect(pred.category).toBe("Career");
    });

    it("should query chart with predictions", async () => {
      const chart = await prisma.chart.findUnique({
        where: { id: chartId },
        include: { predictions: true },
      });

      expect(chart?.predictions.length).toBeGreaterThan(0);
      expect(chart?.predictions[0].category).toBe("Career");
    });
  });

  describe("Subscription CRUD", () => {
    let userId: string;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: { email: "sub.test@harmony.local", passwordHash: "pwd" },
      });
      userId = user.id;
    });

    it("should create a subscription", async () => {
      const sub = await prisma.subscription.create({
        data: {
          userId,
          plan: "AN_NHIEN",
          status: "ACTIVE",
        },
      });

      expect(sub.plan).toBe("AN_NHIEN");
      expect(sub.status).toBe("ACTIVE");
    });

    it("should update subscription plan", async () => {
      const updated = await prisma.subscription.update({
        where: { userId },
        data: { plan: "BINH_AN" },
      });

      expect(updated.plan).toBe("BINH_AN");
    });

    it("should query user with subscription", async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscriptions: true },
      });

      expect(user?.subscriptions.length).toBeGreaterThan(0);
      expect(user?.subscriptions[0].plan).toBe("BINH_AN");
    });
  });

  describe("JournalEntry CRUD", () => {
    let userId: string;
    let predictionId: string;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: { email: "journal.test@harmony.local", passwordHash: "pwd" },
      });
      userId = user.id;

      const profile = await prisma.profile.create({
        data: {
          userId,
          gender: "MALE",
          birthDate: new Date("1992-03-10"),
        },
      });

      const chart = await prisma.chart.create({
        data: {
          profileId: profile.id,
          type: "BatTu",
          rawData: {},
        },
      });

      const pred = await prisma.prediction.create({
        data: {
          chartId: chart.id,
          category: "Health",
          content: "Good health period",
        },
      });
      predictionId = pred.id;
    });

    it("should create journal entry with prediction reference", async () => {
      const entry = await prisma.journalEntry.create({
        data: {
          userId,
          eventDate: new Date(),
          content: "Feeling very healthy and energetic",
          predictionId,
          status: "verified",
        },
      });

      expect(entry.userId).toBe(userId);
      expect(entry.status).toBe("verified");
    });

    it("should query journal entries with predictions", async () => {
      const entries = await prisma.journalEntry.findMany({
        where: { userId },
        include: { prediction: true },
      });

      expect(entries.length).toBeGreaterThan(0);
      expect(entries[0].prediction?.category).toBe("Health");
    });

    it("should calculate trust score from journal entries", async () => {
      const entries = await prisma.journalEntry.findMany({
        where: { userId, status: "verified" },
      });

      const avgTrustScore =
        entries.reduce((sum, e) => sum + (e.trustScore || 0), 0) / entries.length ||
        0;

      expect(avgTrustScore).toBeGreaterThanOrEqual(0);
      expect(avgTrustScore).toBeLessThanOrEqual(1);
    });
  });

  describe("Relationships & Cascading Deletes", () => {
    it("should cascade delete predictions when chart is deleted", async () => {
      const user = await prisma.user.create({
        data: { email: "cascade.test@harmony.local", passwordHash: "pwd" },
      });

      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          gender: "FEMALE",
          birthDate: new Date("1993-07-25"),
        },
      });

      const chart = await prisma.chart.create({
        data: {
          profileId: profile.id,
          type: "TzVi",
          rawData: {},
        },
      });

      await prisma.prediction.create({
        data: {
          chartId: chart.id,
          category: "Love",
          content: "Test prediction",
        },
      });

      // Delete chart
      await prisma.chart.delete({ where: { id: chart.id } });

      // Verify predictions are deleted
      const predictions = await prisma.prediction.findMany({
        where: { chartId: chart.id },
      });

      expect(predictions.length).toBe(0);
    });

    it("should cascade delete profile when user is deleted", async () => {
      const user = await prisma.user.create({
        data: { email: "cascade2.test@harmony.local", passwordHash: "pwd" },
      });

      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          gender: "MALE",
          birthDate: new Date("1994-09-12"),
        },
      });

      // Delete user
      await prisma.user.delete({ where: { id: user.id } });

      // Verify profile is deleted
      const deletedProfile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      expect(deletedProfile).toBeNull();
    });
  });
});
