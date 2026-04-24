export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let body: { senha?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requisição inválida' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { senha } = body
  const gatePassword = process.env.GATE_PASSWORD

  if (!gatePassword) {
    return new Response(JSON.stringify({ error: 'Configuração ausente no servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (senha !== gatePassword) {
    return new Response(JSON.stringify({ error: 'Senha incorreta' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
      'Set-Cookie': `tcway_auth=${encodeURIComponent(senha)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`,
    },
  })
}
