import { RegisterUseCase } from "@/use-cases/register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it } from "vitest";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./user-already-exists-error";

describe("Register use case", () => {
  it("should be able to register", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const { user } = await registerUseCase.execute({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const { user } = await registerUseCase.execute({
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
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const email = "bruce@email.com";

    await registerUseCase.execute({
      name: "Bruce Wayne",
      email: "bruce@email.com",
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "Bruce Wayne",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
