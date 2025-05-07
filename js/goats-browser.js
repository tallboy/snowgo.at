// Browser-compatible wrapper for goats.js
// Imports goats data and exposes it to the global scope

// Import goats data - try both relative and absolute paths
async function loadGoatsData() {
  try {
    // First try the relative path (development environment)
    const module = await import('../goats.js');
    console.log('Loaded goats data from relative path');
    return module.default;
  } catch (error) {
    // If that fails, try the absolute path (production environment)
    try {
      const module = await import('/goats.js');
      console.log('Loaded goats data from absolute path');
      return module.default;
    } catch (error) {
      console.error('Failed to load goats data from any path:', error);
      return [];
    }
  }
}

// Load the goats data and expose it to the global scope
loadGoatsData().then(goatsData => {
  window.goatsData = goatsData;
  console.log(`Loaded ${goatsData.length} goats`);
  
  // Dispatch an event to notify that goats data is loaded
  window.dispatchEvent(new CustomEvent('goatsDataLoaded', { detail: { goatsData } }));
});
