import { RegisterUseCase } from "@/use-cases/register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toEqual(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "bruce@email.com";

    await sut.execute({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Bruce Wayne",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
