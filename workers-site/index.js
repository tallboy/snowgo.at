/**
 * Modern Cloudflare Workers script for serving static assets
 * This script serves files from the dist directory
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // If path is '/' or empty, serve index.html
    if (path === '/' || path === '') {
      path = '/index.html';
    }
    
    // Try to serve the requested file from the assets
    try {
      // Get the file from the static assets
      const response = await env.ASSETS.fetch(new Request(url.toString(), request));
      
      // If the file is found, return it
      if (response.status === 200) {
        // Set appropriate cache headers
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=3600');
        
        // Set content type based on file extension
        if (path.endsWith('.html')) {
          headers.set('Content-Type', 'text/html; charset=UTF-8');
        } else if (path.endsWith('.css')) {
          headers.set('Content-Type', 'text/css; charset=UTF-8');
        } else if (path.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript; charset=UTF-8');
        } else if (path.endsWith('.json')) {
          headers.set('Content-Type', 'application/json; charset=UTF-8');
        } else if (path.endsWith('.png')) {
          headers.set('Content-Type', 'image/png');
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
          headers.set('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.svg')) {
          headers.set('Content-Type', 'image/svg+xml');
        } else if (path.endsWith('.ico')) {
          headers.set('Content-Type', 'image/x-icon');
        }
        
        return new Response(response.body, {
          status: 200,
          headers
        });
      }
      
      // If file not found, try to serve index.html for SPA routing
      if (response.status === 404 && !path.includes('.')) {
        const indexResponse = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
        if (indexResponse.status === 200) {
          return new Response(indexResponse.body, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=UTF-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        }
      }
      
      // If still not found, return 404
      return new Response('Not Found', { status: 404 });
    } catch (e) {
      // If an error occurs, return a 500 error
      return new Response('Internal Server Error: ' + (e.message || e.toString()), {
        status: 500
      });
    }
  }
};
