const { getEssays } = require('./app/essays/utils.ts');
const essays = getEssays();
console.log('Total essays:', essays.length);
const featured = essays.find(e => e.slug === 'two-steps-one-test') || essays.find(e => e.metadata.featured);
console.log('Featured essay:', featured?.metadata.title);
console.log('Regular essays:', essays.filter(e => e.slug !== 'two-steps-one-test' && !e.metadata.featured).length);
