
import { NextApiHandler } from 'next';
import { createReadStream } from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { parse } from 'url';
import rawBody from 'raw-body';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<any>({ req, res })
  await supabase.auth.getSession()
  return res
}


