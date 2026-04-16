# Classical Way Editorial — Contexto do Projeto

## Stack
- React + Vite + TypeScript
- Tailwind CSS com design system customizado (cores: bx-, gd-, gy-, surface-)
- Fontes: font-display (Cinzel), font-heading (Playfair Display), font-body (EB Garamond)
- Supabase (banco de dados + auth + storage)
- GitHub → Vercel (deploy automático)
- @tailwindcss/typography instalado (classes prose para corpo dos artigos)

## Repositórios
- Site: github.com/joaogrgomes/classical-way-editorial
- Admin: github.com/joaogrgomes/tcway-admin
- Site em produção: classical-way-editorial.vercel.app
- Admin em produção: tcway-admin.vercel.app

## Tabelas Supabase
- articles: id, title, slug, category, content, cover_url, status, published_at, created_at, author_id, editors_note, featured_book_title, featured_book_author, featured_book_cover_url, featured_book_amazon_url, featured_book_description
- authors: id, name, bio, photo_url, slug, created_at
- book_reviews: id, title, slug, content, cover_url, book_title, book_author, status, author_id, published_at, created_at

## Páginas do site
- / → Home (Index.tsx)
- /artigos → Lista de artigos com filtros dropdown por tema e autor (ArtigosPage.tsx)
- /artigos/:slug → Artigo individual com compartilhar, tempo de leitura, autor clicável, editor's note, indicação de livro, newsletter (ArtigoPage.tsx)
- /autores/:slug → Página do autor com bio e lista de artigos (AutorPage.tsx)
- /podcasts → Lista de podcasts (PodcastsPage.tsx)
- /podcasts/:slug → Podcast individual (PodcastPage.tsx)
- /resenhas → Book Reviews (BookReviewsPage.tsx)
- /resenhas/:slug → Resenha individual (BookResenhaPage.tsx)
- /sobre → Sobre Nós (SobreNosPage.tsx)
- /apoiar → Apoiar (ApoiarPage.tsx)

## Regras de design
- NUNCA usar border-radius — o design é sem bordas arredondadas
- Sempre usar as classes do design system (bx-, gd-, gy-, surface-)
- Sem emojis na interface
- Tipografia editorial clássica — sem elementos modernos ou coloridos

## Regras de desenvolvimento
- Lovable é usado para alterações estruturais grandes
- Mudanças cirúrgicas fazem direto no código
- Não misturar edições diretas no GitHub com Lovable em uso simultâneo
- vercel.json já configurado com rewrite rules para React Router SPA
- @tailwindcss/typography e @types/node já instalados

## Fluxo de trabalho
Lovable → GitHub (main) → Vercel (deploy automático)
Alterações locais → git add . → git commit → git push → Vercel publica

## Padrão de commit
- feat: nova funcionalidade
- fix: correção de bug
- style: ajuste visual sem mudança de lógica
