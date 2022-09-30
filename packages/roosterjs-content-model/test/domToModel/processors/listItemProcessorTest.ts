import { createContentModelDocument } from '../../../lib/modelApi/creators/createContentModelDocument';
import { createDomToModelContext } from '../../../lib/domToModel/context/createDomToModelContext';
import { DomToModelContext } from '../../../lib/publicTypes/context/DomToModelContext';
import { listItemProcessor } from '../../../lib/domToModel/processors/listItemProcessor';

describe('listItemProcessor', () => {
    let context: DomToModelContext;

    beforeEach(() => {
        context = createDomToModelContext(undefined, {
            processorOverride: {
                LI: listItemProcessor,
            },
        });
    });

    it('LI without valid context', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'General',
                    element: li,
                    blocks: [],
                },
            ],
        });
    });

    it('LI with display:block', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        li.style.display = 'block';

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'General',
                    element: li,
                    blocks: [],
                },
            ],
        });
    });

    it('LI with valid condition', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {},
                    },
                },
            ],
        });
    });

    it('LI with segment format', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        li.style.fontSize = '10px';

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {
                            fontSize: '10px',
                        },
                    },
                },
            ],
        });
    });

    it('LI with child elements', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');
        li.appendChild(document.createTextNode('test'));

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [
                        {
                            blockType: 'Paragraph',
                            isImplicit: true,
                            segments: [
                                {
                                    segmentType: 'Text',
                                    text: 'test',
                                    format: {},
                                },
                            ],
                        },
                    ],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {},
                    },
                },
            ],
        });
    });
});

describe('listItemProcessor without format handlers', () => {
    let context: DomToModelContext;

    beforeEach(() => {
        context = createDomToModelContext(undefined, {
            processorOverride: {
                LI: listItemProcessor,
            },
            formatParserOverride: {
                listItemThread: null,
                listItemMetadata: null,
            },
        });
    });

    it('LI without valid context', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'General',
                    element: li,
                    blocks: [],
                },
            ],
        });
    });

    it('LI with display:block', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        li.style.display = 'block';

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'General',
                    element: li,
                    blocks: [],
                },
            ],
        });
    });

    it('LI with valid condition', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {},
                    },
                },
            ],
        });
    });

    it('LI with segment format', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');

        li.style.fontSize = '10px';

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {
                            fontSize: '10px',
                        },
                    },
                },
            ],
        });
    });

    it('LI with child elements', () => {
        const group = createContentModelDocument(document);
        const li = document.createElement('li');
        li.appendChild(document.createTextNode('test'));

        context.listFormat.levels = [{ listType: 'UL' }];
        context.listFormat.listParent = group;
        context.listFormat.threadItemCounts = [0];

        listItemProcessor(group, li, context);

        expect(group).toEqual({
            blockGroupType: 'Document',
            document: document,
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'ListItem',
                    blocks: [
                        {
                            blockType: 'Paragraph',
                            isImplicit: true,
                            segments: [
                                {
                                    segmentType: 'Text',
                                    text: 'test',
                                    format: {},
                                },
                            ],
                        },
                    ],
                    levels: [
                        {
                            listType: 'UL',
                        },
                    ],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        isSelected: true,
                        format: {},
                    },
                },
            ],
        });
    });
});