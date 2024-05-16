import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/app/models/User";

export const authOptions = {
    secret: process.env.SECRET,  
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            
            name: 'Credentials',
            id: 'credentials',
            
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const username = credentials.username;
                const password = credentials.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ username });
                const ok = user && bcrypt.compareSync(password, user.password);

                if (ok) {
                    return user;
                }

                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}