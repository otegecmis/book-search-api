import request from "supertest";
import app from "../../app.js";

jest.mock("redis", () => ({
  createClient: () => ({
    on: jest.fn(),
    quit: jest.fn(),
  }),
}));

describe("Index Routes", () => {
  describe("GET /api", () => {
    it("should return a welcome message", async () => {
      const response = await request(app).get("/api");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Welcome to the API! 🚀" });
    });
  });
});
