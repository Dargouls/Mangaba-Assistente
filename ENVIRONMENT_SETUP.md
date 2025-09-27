# 🌍 Configuração de Ambientes - Mangaba Assistente

Este documento explica como configurar e gerenciar diferentes ambientes (desenvolvimento e produção) para o projeto Mangaba Assistente.

## 📁 Estrutura de Arquivos de Ambiente

### Frontend

```
├── .env                    # Arquivo padrão (fallback)
├── .env.development        # Configurações de desenvolvimento
├── .env.production         # Configurações de produção
└── .env.local             # Configurações locais (não commitado)
```

### Backend

```
backend/
├── .env                    # Arquivo padrão (fallback)
├── .env.development        # Configurações de desenvolvimento
├── .env.production         # Configurações de produção
└── .env.local             # Configurações locais (não commitado)
```

## 🚀 Configuração para Desenvolvimento Local

### 1. Frontend

Copie o arquivo de desenvolvimento para uso local:

```bash
cp .env.development .env.local
```

Ou crie um arquivo `.env.local` com suas configurações específicas:

```env
# Suas configurações locais específicas
VITE_GEMINI_API_KEY=sua_chave_api_aqui
VITE_API_BASE_URL=http://localhost:3001/api
VITE_DEBUG_MODE=true
```

### 2. Backend

Copie o arquivo de desenvolvimento para uso local:

```bash
cp backend/.env.development backend/.env.local
```

Ou crie um arquivo `backend/.env.local` com suas configurações específicas:

```env
# Suas configurações locais específicas
DATABASE_URL=sua_string_de_conexao_local
JWT_SECRET=sua_chave_jwt_local
```

## 🏭 Configuração para Produção

### ⚠️ IMPORTANTE - Segurança em Produção

**NUNCA commite arquivos .env.production com valores reais!**

### 1. Frontend em Produção

Configure as seguintes variáveis no seu provedor de hospedagem:

```env
# URLs da API
VITE_API_BASE_URL=https://sua-api-producao.com/api
VITE_BACKEND_URL=https://sua-api-producao.com

# Chaves API
VITE_GEMINI_API_KEY=sua_chave_producao_gemini

# Configurações de produção
VITE_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
VITE_SECURE_MODE=true
```

### 2. Backend em Produção

Configure as seguintes variáveis no seu provedor de hospedagem:

```env
# Servidor
PORT=3001
NODE_ENV=production
HOST=0.0.0.0

# Banco de dados
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require

# JWT (use chaves seguras!)
JWT_SECRET=sua_chave_jwt_super_segura_producao
JWT_EXPIRES_IN=24h

# CORS
FRONTEND_URL=https://seu-frontend-producao.com
ALLOWED_ORIGINS=https://seu-frontend-producao.com

# Email
EMAIL_SERVICE=sendgrid
EMAIL_PASS=sua_chave_sendgrid
EMAIL_FROM=noreply@suaempresa.com
```

## 🔧 Como o Vite Carrega os Arquivos

O Vite carrega os arquivos de ambiente na seguinte ordem de prioridade:

1. `.env.local` (sempre ignorado pelo git)
2. `.env.[mode].local` (sempre ignorado pelo git)
3. `.env.[mode]` (development/production)
4. `.env`

## 📋 Variáveis Disponíveis

### Frontend (prefixo VITE\_)

| Variável              | Desenvolvimento             | Produção                         | Descrição           |
| --------------------- | --------------------------- | -------------------------------- | ------------------- |
| `VITE_API_BASE_URL`   | `http://localhost:3001/api` | `https://api.suaempresa.com/api` | URL base da API     |
| `VITE_GEMINI_API_KEY` | Chave de dev                | Chave de produção                | Chave da API Gemini |
| `VITE_DEBUG_MODE`     | `true`                      | `false`                          | Modo debug          |
| `VITE_ENVIRONMENT`    | `development`               | `production`                     | Ambiente atual      |

### Backend

| Variável       | Desenvolvimento         | Produção              | Descrição                  |
| -------------- | ----------------------- | --------------------- | -------------------------- |
| `DATABASE_URL` | URL do Neon (dev)       | URL do banco produção | String de conexão do banco |
| `JWT_SECRET`   | Chave simples           | Chave complexa        | Segredo para JWT           |
| `FRONTEND_URL` | `http://localhost:5173` | URL real do frontend  | URL do frontend para CORS  |
| `NODE_ENV`     | `development`           | `production`          | Ambiente Node.js           |

## 🛡️ Boas Práticas de Segurança

### ✅ Faça

- Use chaves diferentes para desenvolvimento e produção
- Configure variáveis no painel do provedor de hospedagem
- Use gerenciadores de segredos em produção (AWS Secrets Manager, etc.)
- Rotacione chaves regularmente
- Use HTTPS em produção
- Configure rate limiting adequado

### ❌ Não Faça

- Commitar arquivos .env.production com valores reais
- Usar as mesmas chaves em dev e produção
- Expor chaves em logs ou código
- Usar senhas fracas
- Compartilhar chaves por email/chat

## 🚀 Deploy

### Vercel (Frontend)

1. Configure as variáveis no painel da Vercel
2. Use o arquivo `.env.production` como referência
3. Prefixe todas as variáveis com `VITE_`

### Railway/Heroku (Backend)

1. Configure as variáveis no painel do provedor
2. Use o arquivo `backend/.env.production` como referência
3. Configure `DATABASE_URL` com seu banco de produção

### Docker

```dockerfile
# Exemplo para backend
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://...
ENV JWT_SECRET=sua_chave_segura
```

## 🔍 Troubleshooting

### Problema: Variáveis não carregam

- Verifique se o prefixo `VITE_` está correto (frontend)
- Reinicie o servidor de desenvolvimento
- Verifique se o arquivo existe e tem as permissões corretas

### Problema: CORS em produção

- Verifique se `FRONTEND_URL` está correto no backend
- Configure `ALLOWED_ORIGINS` com todas as URLs necessárias

### Problema: Banco não conecta

- Verifique a string de conexão `DATABASE_URL`
- Confirme se SSL está configurado corretamente
- Teste a conexão manualmente

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do servidor
2. Confirme se todas as variáveis estão configuradas
3. Teste em ambiente local primeiro
4. Consulte a documentação do provedor de hospedagem

---

**Lembre-se: Segurança em primeiro lugar! 🔒**
