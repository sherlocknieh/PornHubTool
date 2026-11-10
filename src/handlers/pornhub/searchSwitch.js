// 搜索词只保留字母、数字和空格，避免 - & 等特殊字符干扰 GIF 搜索
function cleanSearchTerm(term) {
    return term.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

// 生成目标搜索页地址，GIF 搜索页使用清理后的搜索词
function toSearchUrl(pageUrl, type) {
    pageUrl.pathname = `/${type}/search`;
    if (type.startsWith('gif')) {
        const term = pageUrl.searchParams.get('search');
        if (term) pageUrl.searchParams.set('search', cleanSearchTerm(term));
    }
    return pageUrl;
}

function createSwitchButton(pageUrl, isVideo) {
    const button = document.createElement('a');
    button.textContent = isVideo ? 'ToGIF' : 'ToVideo';
    button.href = pageUrl.href;

    Object.assign(button.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '6px 8px',
        zIndex: 10,
        backgroundColor: '#ff9900',
        color: 'white',
        border: 'none',
        borderRadius: '999px',
        cursor: 'pointer',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    });

    document.body.appendChild(button);
}

export default function addSearchSwitch(url) {
    if (!url.includes('search')) return;

    const pageUrl = new URL(url);
    const pageType = pageUrl.pathname.match(/^\/(video|gif|gifs)$/)?.[1];
    if (pageType) {
        window.location.replace(toSearchUrl(pageUrl, pageType).href);
        return;
    }

    const isVideo = pageUrl.pathname.startsWith('/video');
    createSwitchButton(toSearchUrl(pageUrl, isVideo ? 'gif' : 'video'), isVideo);
}
