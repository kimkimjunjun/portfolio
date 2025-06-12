type NotionTagColor = 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';

const notionColorToRGBA: Record<Exclude<NotionTagColor, 'default'>, string> = {
    'gray': 'rgba(224, 224, 224, 0.8)',
    'brown': 'rgba(237, 224, 218, 0.8)',
    'orange': 'rgba(250, 229, 211, 0.8)',
    'yellow': 'rgba(251, 243, 219, 0.8)',
    'green': 'rgba(221, 237, 234, 0.8)',
    'blue': 'rgba(221, 235, 241, 0.8)',
    'purple': 'rgba(234, 228, 242, 0.8)',
    'pink': 'rgba(244, 223, 235, 0.8)',
    'red': 'rgba(251, 228, 228, 0.8)',
};

export const renderPropertyValue = (property: any) => {
    switch (property.type) {
        case 'title':
        case 'rich_text':
            return property[property.type].map((rt: any) => rt.plain_text).join('');
        case 'date':
            if (!property.date) return '날짜 없음';
            return `${property.date.start}${property.date.end ? ' ~ ' + property.date.end : ''}`;
        case 'multi_select':
            // option 파라미터의 타입을 명시
            return property.multi_select.map((option: { id: string; name: string; color: NotionTagColor }) => (
                <span key={option.id} style={{
                    backgroundColor: option.color !== 'default'
                        ? notionColorToRGBA[option.color]
                        : '#eee',
                    color: option.color !== 'default' ? `#49290E` : '#333',
                    padding: '2px 6px',
                    marginRight: '4px',
                    borderRadius: '4px',
                    fontSize: '0.8em',
                    display: 'inline-block',
                }}>
                    {option.name}
                </span>
            ));
        case 'select':
            return property.select ? property.select.name : '선택 안됨';
        case 'checkbox':
            return property.checkbox ? '✅ 체크됨' : '⬜ 체크 안됨';
        case 'url':
            return property.url ? <a href={property.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}>{property.url}</a> : 'URL 없음';
        case 'number':
            return property.number !== null ? property.number : '숫자 없음';
        case 'created_time':
        case 'last_edited_time':
            const date = new Date(property[property.type]);
            return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        default:
            console.warn(`Unsupported property type for rendering: ${property.type}`, property);
            return `[${property.type}]`;
    }
};
