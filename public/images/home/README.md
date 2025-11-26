# Home images

Place your source images here (JPG/PNG). Then run the optimizer to produce fast variants.

Recommended steps:

1) Drop your large images (even 2–5MB) into this folder using the names below.
2) Run the optimizer:

	npm run optimize:images

3) Update code to use the optimized variants if desired:
	- Example: mind-bg-1600.avif (desktop), mind-bg-1024.webp (tablet)
	- Fallback exists: mind-bg-1600.jpg and mind-bg.optimized.jpg

Filenames expected by Home page (base names):

- hero-bg.jpg               (Hero background)
- mind-bg.jpg               (Parallax background for "A Mente Adoece")
- mind-photo.jpg            (Inline image for "A Mente Adoece")
- world-bg.jpg              (Parallax background for "O Mundo Real Sofre")
- world-photo.jpg           (Inline image for "O Mundo Real Sofre")
- creation-bg.jpg           (Parallax background for "A Criação Morre")
- creation-photo.jpg        (Inline image for "A Criação Morre")
- surgir-photo.jpg          (Photo in the "Surgir" transition)
- mission-awareness.jpg     (Conscientizar card background)
- mission-unite.jpg         (Unir card background)
- mission-support.jpg       (Apoiar card background)
- deep-dive-report.jpg      (Split screen left background: Relatório)
- deep-dive-manifesto.jpg   (Split screen right background: Manifesto)

Tips:
- Prefer WebP or AVIF when possible (e.g., hero-bg.webp). You can keep the same name but with .webp and update the code accordingly.
- Target ~1600px width for desktop backgrounds, ~1200px for content images. Quality ~60–75 is usually enough.
- Keep file sizes small (<300KB for backgrounds when possible).
 - The optimizer will generate variants: -640, -1024, -1600 in .avif, .webp and .jpg (progressive). Also writes <name>.optimized.jpg as a general fallback.

## Processar apenas novas imagens

O script agora aceita seleção de arquivos e faz "skip" automático se as variantes já existem e estão mais novas que o original.

Comandos (PowerShell):

```powershell
# Ver ajuda
node .\scripts\optimize-images.mjs --help

# Processar apenas 4 novas imagens (exemplo)
node .\scripts\optimize-images.mjs nova1.jpg nova2.jpg nova3.png nova4.png

# Ou com lista separada por vírgulas
node .\scripts\optimize-images.mjs --files=nova1.jpg,nova2.jpg,nova3.png,nova4.png
```

Fluxo seguro recomendado:
1. Adicione as novas imagens aqui.
2. Rode `git status` para confirmar que só elas são novas.
3. Execute o script apenas com os nomes delas (como acima).
4. Verifique o diff: `git diff --name-only` para garantir que só variantes relacionadas foram geradas.
5. Faça commit.

Se precisar reprocessar uma imagem específica (por exemplo ajustar qualidade), apague manualmente suas variantes (`*-640.*`, `*-1024.*`, `*-1600.*` e `<nome>.optimized.jpg`) e rode o script para ela.

O script ignora automaticamente imagens cujas variantes já estão atualizadas, evitando sobrescrever arquivos desnecessariamente.
