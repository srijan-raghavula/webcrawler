import { test, expect } from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from './crawl.js';

test('normalizes urls', () => {
    expect(normalizeURL('https://www.example.com/somepath')).toBe('www.example.com/somepath');
    expect(normalizeURL('https://blog.example.com/somepath')).toBe('blog.example.com/somepath');
    expect(normalizeURL('https://blog.example.com/somepath?with=query')).toBe('blog.example.com/somepath');
    expect(normalizeURL('https://blog.example.com')).toBe('blog.example.com/');
    expect(normalizeURL('https://www.example.com')).toBe('www.example.com/');
})

test('gives URLs from HTML anchor tags', () => {
    expect(getURLsFromHTML(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Example 1</title></head><body><a href="page.html">Link to Page</a><a href="../otherpage.html">Link to Other Page</a><a href="/rootpage.html">Link to Root Page</a><a href="relative/path.html">Relative Path</a><a href="https://something.com/absolute/url.html">Absolute url</a></body></html>`, 'example.com')).toStrictEqual([
        'example.com/page.html',
        'example.com/../otherpage.html',
        'example.com/rootpage.html',
        'example.com/relative/path.html',
        'https://something.com/absolute/url.html',
    ]);
})
