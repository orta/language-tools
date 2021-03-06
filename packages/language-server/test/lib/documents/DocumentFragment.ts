import * as assert from 'assert';
import { TextDocument } from '../../../src/lib/documents/TextDocument';
import { DocumentFragment } from '../../../src/lib/documents/DocumentFragment';

describe('Document Fragment', () => {
    it('gets the correct text', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        assert.strictEqual(fragment.getText(), 'world');
    });

    it('returns the correct text length', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        assert.strictEqual(fragment.getTextLength(), 5);
    });

    it('updates the parent document when setText is called', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        fragment.setText('svelte');

        assert.strictEqual(parent.getText(), 'Hello, svelte!');
    });

    it('isInFragment works', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, \nworld!');
        const fragment = new DocumentFragment(parent, {
            start: 8,
            end: 13,
            attributes: {},
        });

        assert.strictEqual(fragment.isInFragment({ line: 0, character: 0 }), false);
        assert.strictEqual(fragment.isInFragment({ line: 1, character: 0 }), true);
        assert.strictEqual(fragment.isInFragment({ line: 1, character: 5 }), true);
        assert.strictEqual(fragment.isInFragment({ line: 1, character: 6 }), false);
    });

    it('calculates the offset in parent', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        assert.strictEqual(fragment.offsetInParent(2), 9);
    });

    it('calculates the offset in fragment', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        assert.strictEqual(fragment.offsetInFragment(9), 2);
    });

    it('calculates the position in parent', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, \nworld!');
        const fragment = new DocumentFragment(parent, {
            start: 8,
            end: 13,
            attributes: {},
        });

        assert.deepStrictEqual(fragment.positionInParent({ line: 0, character: 2 }), {
            line: 1,
            character: 2,
        });
    });

    it('calculates the position in fragment', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, \nworld!');
        const fragment = new DocumentFragment(parent, {
            start: 8,
            end: 13,
            attributes: {},
        });

        assert.deepStrictEqual(fragment.positionInFragment({ line: 1, character: 2 }), {
            line: 0,
            character: 2,
        });
    });

    it('returns the parent file path', () => {
        const parent = new TextDocument('file:///hello.html', 'Hello, world!');
        const fragment = new DocumentFragment(parent, {
            start: 7,
            end: 12,
            attributes: {},
        });

        assert.strictEqual(fragment.getFilePath(), parent.getFilePath());
    });
});
