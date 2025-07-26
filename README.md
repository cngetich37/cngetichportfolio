# Collins Ngetich Portfolio

A modern, responsive developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Beautiful, responsive design with animated section reveals and sticky navigation.
- **Hero Section**: Professional branding with custom logo and introduction.
- **Skills Showcase**: Colorful, interactive skills grid.
- **About Me**: Detailed professional timeline, core values, and personal interests.
- **Projects & Experience**: Placeholder for real-world projects and collaborations.
- **Testimonials**: Rotating carousel of client and colleague feedback.
- **Contact Form**: Validated form (with Yup + react-hook-form) that sends messages directly to your email using Nodemailer.
- **Accessibility**: Keyboard navigable and accessible form fields.
- **Dark Mode**: Fully supported (auto-detects system preference).

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure Email Sending:**
   - Create a `.env.local` file in the project root:
     ```env
     GMAIL_USER=your_gmail_address@gmail.com
     GMAIL_PASS=your_gmail_app_password
     ```
   - [How to create a Gmail App Password](https://support.google.com/accounts/answer/185833?hl=en)

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

4. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## Tech Stack
- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/) (for contact form email)
- [react-hook-form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) (form validation)
- [react-icons](https://react-icons.github.io/react-icons/)

## Customization
- Update your logo in `public/cngetichlogo.svg`.
- Edit skills, about, testimonials, and projects in `src/app/page.tsx`.
- Contact form sends to `cngetich37@gmail.com` by default (change in `src/app/api/contact/route.ts` if needed).

## License
MIT
