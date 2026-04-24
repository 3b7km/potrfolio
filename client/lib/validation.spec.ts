import { describe, it, expect } from "vitest";
import { ContactFormSchema, ProjectSchema, NewsletterSchema } from "./validation";

describe("Contact Form Validation", () => {
  it("should validate a valid contact form", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message that meets requirements.",
    };

    const result = ContactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject a name that is too short", () => {
    const invalidData = {
      name: "J",
      email: "john@example.com",
      message: "This is a test message.",
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject an invalid email", () => {
    const invalidData = {
      name: "John Doe",
      email: "invalid-email",
      message: "This is a test message.",
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject a message that is too short", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject a name with special characters", () => {
    const invalidData = {
      name: "John@Doe#123",
      email: "john@example.com",
      message: "This is a test message.",
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject a message with HTML tags", () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      message: "<script>alert('xss')</script> This is a test message.",
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should accept a message with single quotes and hyphens in names", () => {
    const validData = {
      name: "Jean-Pierre O'Brien",
      email: "jp@example.com",
      message: "This is a test message with proper length and content.",
    };

    const result = ContactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Project Validation", () => {
  it("should validate a valid project", () => {
    const validProject = {
      id: "1",
      name: "Test Project",
      type: "Web Development",
      description: "A test project",
      url: "https://example.com",
      images: ["https://example.com/image1.jpg"],
      tags: ["React", "TypeScript"],
      metrics: "100%",
      metricContext: "Test metric",
    };

    const result = ProjectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  it("should reject a project with invalid URL", () => {
    const invalidProject = {
      id: "1",
      name: "Test Project",
      type: "Web Development",
      description: "A test project",
      url: "not-a-url",
      images: ["https://example.com/image1.jpg"],
      tags: ["React"],
      metrics: "100%",
      metricContext: "Test metric",
    };

    const result = ProjectSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
  });
});

describe("Newsletter Validation", () => {
  it("should validate a valid newsletter email", () => {
    const validEmail = {
      email: "subscriber@example.com",
    };

    const result = NewsletterSchema.safeParse(validEmail);
    expect(result.success).toBe(true);
  });

  it("should reject an invalid newsletter email", () => {
    const invalidEmail = {
      email: "not-an-email",
    };

    const result = NewsletterSchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
  });
});
