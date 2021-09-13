export async function getLibrary(url) {
    const data = await fetch(url);
    const books = await data.json();

    return books;
}