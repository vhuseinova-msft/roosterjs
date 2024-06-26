import type {
    ContentModelBlockFormat,
    ContentModelParagraph,
    ContentModelSegmentFormat,
    ReadonlyContentModelParagraphDecorator,
} from 'roosterjs-content-model-types';

/**
 * Create a ContentModelParagraph model
 * @param isImplicit @optional Whether this is an implicit paragraph. An implicit paragraph is a paragraph that will not render with DOM element container
 * @param blockFormat @optional Format of this paragraph
 * @param segmentFormat @optional Segment format applied to this block
 * @param decorator @optional Decorator of this paragraph
 */
export function createParagraph(
    isImplicit?: boolean,
    blockFormat?: Readonly<ContentModelBlockFormat>,
    segmentFormat?: Readonly<ContentModelSegmentFormat>,
    decorator?: ReadonlyContentModelParagraphDecorator
): ContentModelParagraph {
    const result: ContentModelParagraph = {
        blockType: 'Paragraph',
        segments: [],
        format: { ...blockFormat },
    };

    if (segmentFormat && Object.keys(segmentFormat).length > 0) {
        result.segmentFormat = { ...segmentFormat };
    }

    if (isImplicit) {
        result.isImplicit = true;
    }

    if (decorator) {
        result.decorator = {
            tagName: decorator.tagName,
            format: { ...decorator.format },
        };
    }

    return result;
}
