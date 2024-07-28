import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#fff",
        },
        secondary: {
          DEFAULT: "#4d4d4d",
        },
      },
    },
    fontWeight: {
      normal: '500',
      bold: '700',
    },
    fontSize: {
      sm: '14px',
      md: '20px',
      lg: '38px',
      xl: '54px',
    }
  },
  plugins: [],
} satisfies Config;
