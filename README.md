# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/539ecc54-d48d-4065-939c-2c1690198a75

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/539ecc54-d48d-4065-939c-2c1690198a75) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Typography (mobile-first)

To improve readability on phones and avoid overflow, use the centralized Heading component:

- Component: `src/components/ui/heading.tsx`
- Variants:
	- `hero`: landing titles — text-3xl on mobile up to lg:text-7xl
	- `section`: section titles — text-2xl on mobile up to lg:text-5xl
	- `sub`: supporting titles — text-xl on mobile up to md:text-3xl
	- `stat`: numeric/KPI — text-4xl on mobile up to lg:text-7xl

Example:

```tsx
import { Heading } from "@/components/ui/heading";

<Heading as="h2" variant="section" className="text-secondary-foreground">
	Nossa Primeira Missão
</Heading>
```

When animating, wrap Heading in a motion.div instead of using motion.h2.

## Tipografia do Movimento

- Fonte padrão (global): Montserrat
- Fonte da marca e qualquer texto que contenha "+Creator": Poppins

Como usar:

- Todo o site já usa Montserrat por padrão.
- Para aplicar Poppins nos pontos de marca, use a classe utilitária `font-poppins` (ex.: `<span className="font-poppins">+Creator</span>`).
- Navbar e Footer já foram ajustados. Em páginas com textos que mencionam "+Creator", os casos principais foram atualizados; no manifesto, a renderização já envolve automaticamente esse termo com Poppins.

## Paleta de Cores

Primárias:

- Acento principal: `#f7613a`
- Background claro: `#eff0f1`
- Texto/escuro (também usado como “alarm”): `#2d2e30`
- Secondary (azul): `#384477`

Secundárias:

- Accent/support (cinza quente): `#65645E`
- Muted/border: `#d3d9dc`
- Beige de apoio: `#c0ad96`

Implementação técnica:

- As variáveis CSS em `src/index.css` foram alinhadas a essas cores (ex.: `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`, etc.) e o Tailwind consome via `hsl(var(--...))`.
- Gradientes principais usam `--primary` → `--secondary`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/539ecc54-d48d-4065-939c-2c1690198a75) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
