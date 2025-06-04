```markdown
# 🐾 PetHelp - Frontend

Frontend do **PetHelp**, uma plataforma acolhedora para adoção de animais, denúncias de maus-tratos e gestão de pets por ONGs. Desenvolvido com **Next.js 14 (App Router)** para garantir performance, acessibilidade e uma experiência fluida.

---

## 📌 Visão Geral

O frontend será uma aplicação web moderna com foco em:

- Adoção de animais abandonados
- Visualização detalhada dos pets
- Denúncias de maus-tratos
- Painel de gerenciamento para ONGs

---

## 🧱 Stack de Tecnologias

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (componentes visuais)
- **Axios** (requisições HTTP)
- **react-hook-form** + **zod** (validações)
- **Google Maps API** (geolocalização)
- **Vercel** (deploy)

---

## 🖥️ Estrutura de Páginas
```

/
├── homepage → Landing page com chamada para adoção e denúncias
├── animals → Lista de animais disponíveis
├── animals/\[id] → Detalhes de um animal
├── adopt/\[id] → Formulário de adoção
├── reports/create → Formulário para denúncia
├── login → Página de login
├── register → Cadastro de usuário (ONG ou adotante)
├── dashboard → Painel para ONGs gerenciarem animais

````

---

## 🧪 MVP do Frontend

### ✅ Funcionalidades

- ✅ Listar animais disponíveis para adoção
- ✅ Ver detalhes dos pets
- ✅ Formulário de pré-cadastro para adoção
- ✅ Página de denúncias com upload e mapa
- ✅ Login e cadastro de usuários (ONG/adotante)
- ✅ Painel da ONG com gerenciamento de animais
- ✅ Feedbacks visuais (loading, erros, sucesso)

---

## 🎯 Requisitos Funcionais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Autenticação** | Cadastro/Login com JWT e persistência |
| **Listagem de pets** | Grid de animais com imagem e dados |
| **Detalhes do pet** | Página com infos completas e botão de adoção |
| **Adoção** | Formulário validado com feedbacks |
| **Denúncia** | Descrição, imagem e mapa de localização |
| **Dashboard** | Gerenciar animais (listar, editar, excluir) |

---

## 🎨 Design & Estilo

- Visual moderno e acolhedor
- Paleta: tons pastéis, azul claro, branco, amarelo
- Tipografia: `Inter`, `Poppins`
- Componentes reutilizáveis com `shadcn/ui`
- Layout responsivo (mobile first)
- Suporte a **Dark Mode** opcional

---

## 📦 Componentes Planejados

| Componente      | Descrição                                     |
|-----------------|-----------------------------------------------|
| `AnimalCard`    | Exibe info básica do pet em cards             |
| `Navbar`        | Navegação responsiva                          |
| `Footer`        | Rodapé com links úteis                        |
| `AuthForm`      | Formulário reutilizável de login/cadastro     |
| `AdoptForm`     | Formulário de adoção                          |
| `ReportForm`    | Formulário de denúncia com upload e mapa      |
| `MapSelector`   | Seleção de local via Google Maps              |
| `DashboardTable`| Tabela de pets cadastrados pela ONG          |
| `ImageUploader` | Upload de imagem com preview                  |
| `Toast`         | Notificações de sucesso/erro                  |

---

## 🔄 Integração com API

- Autenticação com JWT
- Token armazenado em `localStorage` ou cookies (`HttpOnly`, se necessário)
- Requisições com **Axios** configurado com interceptors globais

### 📦 Exemplo de chamada à API

```ts
// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
````

---

## 📁 Estrutura de Pastas Sugerida

```
/src
├── app/
│   ├── page.tsx                     → Homepage
│   ├── animals/page.tsx            → Lista de pets
│   ├── animals/[id]/page.tsx       → Detalhes do pet
│   └── dashboard/page.tsx          → Painel da ONG
├── components/
│   ├── ui/                         → Botões, inputs, cards...
│   ├── forms/                      → Formulários reutilizáveis
│   ├── layout/                     → Navbar, Footer
├── services/
│   └── api.ts                      → Axios config
├── hooks/                          → Hooks personalizados
├── lib/                            → Helpers de validação, auth
├── styles/                         → Configurações do Tailwind
```

---

## 🚀 Deploy

- Deploy automático via **Vercel**
- Variáveis de ambiente:

  ```env
  NEXT_PUBLIC_API_URL=https://sua-api.com
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=XXXX
  ```

---
