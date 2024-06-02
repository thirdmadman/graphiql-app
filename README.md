# graphiql-app

GraphiQL is a playground/IDE for graphQL requests. This is team task for RSSchool course of REACT2023Q4

This project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Built With

- [React](https://react.dev/)
- [NEXT.JS](https://nextjs.org/)
- [NextUI](https://nextui.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/)

## Getting Started


### Installation

1. Clone the repo

```sh
git clone https://github.com/thirdmadman/graphiql-app.git
```

2. Install NPM packages

```sh
npm install
# or
yarn add
# or
pnpm add
# or
bun install
```

3. Set up Firebase project according to "Setting up Firebase" section in this article: https://blog.logrocket.com/user-authentication-firebase-react-apps/

4. Rename `.env.local.example` to `.env.local` and enter config data from you Firebase project in it

```sh
NEXT_PUBLIC_FIREBASE_API_KEY =
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN =
NEXT_PUBLIC_FIREBASE_PROJECT_ID =
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
NEXT_PUBLIC_FIREBASE_APP_ID =
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID =
```

5. Get SEVICE_ACCOUNT key in your Firebase Project according to this article: https://clemfournier.medium.com/how-to-get-my-firebase-service-account-key-file-f0ec97a21620

6.  and also put in `.env.local`

```sh
SERVICE_ACCOUNT =
```


### Usage
1. Run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by   modifying `app/page.tsx`. The page auto-updates as you edit the file. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
