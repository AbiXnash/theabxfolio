export function sortResearchByYear(items: any[]) {
    return [...items].sort((a, b) => {
        const yearA = parseInt(a.meta.match(/\d{4}/)?.[0] || '0');
        const yearB = parseInt(b.meta.match(/\d{4}/)?.[0] || '0');
        return yearB - yearA;
    });
}
