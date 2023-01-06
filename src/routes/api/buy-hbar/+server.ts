import { error, json } from '@sveltejs/kit';
import buildTx from '$lib/api/buildTx';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
    const { buyer } = await request.json();
    const bytes = await buildTx(buyer);
    if (!bytes) {
        throw error(400, 'Bytes could not be generated');
    }
    console.log(bytes, 'bytes')
    return json(bytes);
}) satisfies RequestHandler;
