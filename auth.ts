import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { query } from './app/lib/mysql';
import { DefaultSession } from 'next-auth';
import { fetchUserDetails } from './app/lib/data';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) {
                    return user
                };
            }
            console.log('Invalid credentials');
            return null;
        },
    }),],
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.sub!;
            const userDetails = await fetchUserDetails(Number(session?.user.id));
            session.user.companyId = userDetails.company_id;
            session.user.branchId = userDetails.branch_id;
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
});

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        branchId:number;
        companyId:number;
      } & DefaultSession['user'];
    }
  }


async function getUser(email: string): Promise<User | undefined> {
    try {
        const data = await query(`SELECT * FROM crm_users WHERE email='${email}'`, []);
        const fetchedData = JSON.stringify(data);
        const resData: User[] = JSON.parse(fetchedData);
        const user = resData[0];
        return resData[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}