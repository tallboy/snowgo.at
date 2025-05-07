/**
 * 🐐 Snow Goat - Cloudflare Workers script for serving static assets
 * This script serves files from the dist directory with proper content types
 */

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things:
 * 1. We will skip caching on the edge, making it easier to debug
 * 2. We will return more detailed error messages to the client
 */
const DEBUG = false;

/**
 * Define content type mappings for file extensions
 */
const CONTENT_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif'
};

/**
 * Handle all requests to the worker
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Add some debugging information to the console
    console.log(`🐐 Handling request for ${path}`);
    
    try {
      // If path is '/' or empty, serve index.html
      if (path === '/' || path === '') {
        path = '/index.html';
      }
      
      // Try to get the asset from KV storage
      let options = {};
      
      if (DEBUG) {
        // Customize caching for debugging
        options.cacheControl = {
          bypassCache: true,
        };
      } else {
        // Customize caching for production
        options.cacheControl = {
          browserTTL: 60 * 60 * 24, // 1 day
          edgeTTL: 60 * 60 * 24 * 7, // 7 days
          bypassCache: false,
        };
      }
      
      // Special handling for image files to ensure they load properly
      const extension = path.substring(path.lastIndexOf('.') || path.length);
      if (CONTENT_TYPES[extension]) {
        options.mapRequestToAsset = req => {
          const url = new URL(req.url);
          url.pathname = path;
          return new Request(url.toString(), req);
        };
      }
      
      // Get the asset from KV
      const asset = await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      }, options);
      
      // Set appropriate content type based on file extension
      const contentType = CONTENT_TYPES[extension];
      if (contentType) {
        const response = new Response(asset.body, asset);
        response.headers.set('Content-Type', contentType);
        response.headers.set('X-Snow-Goat', '🐐');
        return response;
      }
      
      // Return the asset as-is if no special content type handling is needed
      return asset;
      
    } catch (e) {
      // If an error occurs, return a 404 for missing assets or 500 for other errors
      if (e.status === 404 || e.code === 'ENOENT') {
        // For SPA routing, serve index.html for non-file requests
        if (!path.includes('.')) {
          try {
            const notFoundResponse = await getAssetFromKV({
              request: new Request(`${url.origin}/index.html`, request),
              waitUntil: ctx.waitUntil.bind(ctx),
            });
            return new Response(notFoundResponse.body, {
              ...notFoundResponse,
              status: 200,
              headers: {
                ...notFoundResponse.headers,
                'Content-Type': 'text/html; charset=UTF-8',
              }
            });
          } catch (error) {
            // If we can't even get the index.html, return a generic 404
            return new Response('Not Found', { status: 404 });
          }
        }
        
        // Otherwise, return a 404 response
        return new Response('Not Found', { status: 404 });
      }
      
      // For all other errors, return a 500 response
      const errorMessage = DEBUG ? `Error: ${e.message || e.toString()}` : 'Internal Server Error';
      return new Response(errorMessage, { status: 500 });
    }
  }
};
