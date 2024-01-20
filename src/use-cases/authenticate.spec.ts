import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCrenditialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "bruce@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "bruce@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCrenditialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "bruce@email.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCrenditialsError);
  });
});
