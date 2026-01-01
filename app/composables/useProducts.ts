export const useProducts = () => {
  const products = [
    { id: 1, key: 'zen_table', category: 'chairs', image: 'https://placehold.co/600x750/D4B996/333333?text=Zen+Table', specs: { material: 'Solid Walnut', dimensions: '120 x 60 x 45 cm', weight: '25kg' } },
    { id: 2, key: 'oak_chair', category: 'chairs', image: 'https://placehold.co/600x750/C19A6B/333333?text=Oak+Chair', specs: { material: 'White Oak', dimensions: '45 x 48 x 82 cm', weight: '6kg' } },
    { id: 3, key: 'silent_wardrobe', category: 'wardrobe', image: 'https://placehold.co/600x750/E8E5E0/333333?text=Silent+Wardrobe', specs: { material: 'Ash Wood', dimensions: '180 x 60 x 220 cm', weight: '85kg' } },
    { id: 4, key: 'cloud_bookshelf', category: 'custom', image: 'https://placehold.co/600x750/A07E50/FFFFFF?text=Cloud+Bookshelf', specs: { material: 'Teak', dimensions: 'Customizable', weight: 'Varies' } },
    { id: 5, key: 'nature_bed', category: 'custom', image: 'https://placehold.co/600x750/D4B996/333333?text=Nature+Bed', specs: { material: 'Cherry Wood', dimensions: '180 x 200 cm', weight: '55kg' } },
    { id: 6, key: 'flow_cabinet', category: 'wardrobe', image: 'https://placehold.co/600x750/F8F5F0/333333?text=Flow+Cabinet', specs: { material: 'Maple', dimensions: '100 x 40 x 90 cm', weight: '30kg' } },
    { id: 7, key: 'minimal_sofa', category: 'chairs', image: 'https://placehold.co/600x750/C8B29E/333333?text=Minimal+Sofa', specs: { material: 'Cotton Linen + Oak Frame', dimensions: '220 x 90 x 85 cm', weight: '45kg' } },
    { id: 8, key: 'rattan_chair', category: 'chairs', image: 'https://placehold.co/600x750/D8C3A5/333333?text=Rattan+Chair', specs: { material: 'Natural Rattan', dimensions: '50 x 55 x 78 cm', weight: '5kg' } },
    { id: 9, key: 'glass_cabinet', category: 'wardrobe', image: 'https://placehold.co/600x750/EAE7DC/333333?text=Glass+Cabinet', specs: { material: 'Tempered Glass + Wood', dimensions: '90 x 40 x 180 cm', weight: '40kg' } }
  ]

  const getProductByKey = (key) => {
    return products.find(p => p.key === key)
  }

  const getRelatedProducts = (currentKey, limit = 3) => {
    return products.filter(p => p.key !== currentKey).slice(0, limit)
  }

  return {
    products,
    getProductByKey,
    getRelatedProducts
  }
}
