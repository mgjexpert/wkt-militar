# Operação WKT

MVP da plataforma web/PWA para os 21 treinos WKT.

## Arquitetura

- Next.js App Router + TypeScript
- Vercel para deploy e backend serverless
- Neon Postgres via Vercel Marketplace usando `DATABASE_URL`
- Google Drive Preview para os vídeos (sem Drive API)
- XPayments PIX S2S encapsulado em `lib/payments/xpayments.ts`
- Sessão JWT httpOnly para o MVP

## Rodar localmente

```bash
cp .env.example .env.local
npm install
npm run dev
```

Acesso de teste:
- URL: `/login`
- código padrão: `WKT2026`

Troque `DEMO_ACCESS_CODE` e `AUTH_SECRET` antes de disponibilizar o preview.

## Google Drive

A aplicação usa apenas:

```
https://drive.google.com/file/d/<FILE_ID>/preview
```

Nenhuma API do Google Drive é necessária. Para funcionar para alunos, as permissões dos vídeos precisam permitir o playback no contexto escolhido.

## Banco

O antigo Vercel Postgres first-party foi descontinuado. Provisionar **Neon** pelo Vercel Marketplace e conectar ao projeto; a variável `DATABASE_URL` será usada pela camada Drizzle.

Schemas iniciais:
- users
- orders
- entitlements
- workout_progress

## XPayments

Por segurança, o repositório nasce com:

```
XPAYMENTS_MODE=mock
```

O adapter live está isolado em `lib/payments/xpayments.ts`. Antes de mudar para `live`, conferir na documentação/conta XPayments:
1. URL exata de criação PIX
2. formato de autenticação
3. nomes dos campos do payload
4. estrutura da resposta QR/copia-e-cola
5. assinatura e payload do webhook

Depois configurar apenas Environment Variables da Vercel. Nunca versionar credenciais.

## Próximos passos

1. Importar o repositório na Vercel
2. Instalar Neon free pelo Marketplace e ligar ao projeto
3. Criar envs do preview
4. Validar os 21 players do Drive
5. Finalizar mapping da XPayments
6. Persistir pedidos, entitlements e progresso no Postgres
7. Adicionar domínio e passar para Vercel Pro antes de uso comercial
