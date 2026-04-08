import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
    .get("/", () => ({ status: "Server is up and running!" }))
    .get("/users", async () => {
        try {
            const allUsers = await db.select().from(users);
            return allUsers;
        } catch (error) {
            return { error: "Database not connected or migration pending." };
        }
    })
    .listen(process.env.PORT || 3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
