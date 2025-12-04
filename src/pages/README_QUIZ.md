# 📋 Instruções para Restaurar o Quiz

## 🔄 Como Restaurar o Quiz Original

O código completo do quiz interativo foi salvo em **`Quiz.ORIGINAL.tsx`** para uso futuro.

### Opção 1: Restauração Manual (Recomendado)
```bash
# 1. Renomear o arquivo atual (construção) para backup
mv src/pages/Quiz.tsx src/pages/Quiz.EmConstrucao.tsx

# 2. Restaurar o original
mv src/pages/Quiz.ORIGINAL.tsx src/pages/Quiz.tsx
```

### Opção 2: Via PowerShell
```powershell
# 1. Renomear arquivo atual
Rename-Item -Path "src\pages\Quiz.tsx" -NewName "Quiz.EmConstrucao.tsx"

# 2. Restaurar o original
Rename-Item -Path "src\pages\Quiz.ORIGINAL.tsx" -NewName "Quiz.tsx"
```

### Opção 3: Via Git (se já commitou)
```bash
# Ver o histórico
git log --oneline -- src/pages/Quiz.tsx

# Restaurar versão específica (substitua HASH pelo commit)
git checkout HASH -- src/pages/Quiz.tsx
```

## 📂 Arquivos Salvos

- **`Quiz.tsx`** - Versão atual (página "Em Construção")
- **`Quiz.ORIGINAL.tsx`** - Código completo do quiz interativo
- **`Quiz.backup.tsx`** - Backup automático via git

## 🎯 O que foi preservado no arquivo original:

- ✅ 5 perguntas interativas com imagens
- ✅ 4 perfis de resultado (Cronicamente Online, Sommelier de Vida Alheia, Escravo do Engajamento, Offline Raiz)
- ✅ Animações com Framer Motion
- ✅ Sistema de progresso
- ✅ Geração e download de cards
- ✅ Integração com WhatsApp
- ✅ Todas as funcionalidades e estilos

## 💡 Dica

Quando quiser ativar o quiz novamente, basta seguir as instruções acima. O código está 100% funcional e pronto para uso!
