// 搜索词只保留字母、数字和空格，避免 - & 等特殊字符干扰 GIF 搜索
function cleanSearchTerm(term) {
    return term.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

// 把 GIF 搜索页的搜索词替换为清理后的版本，返回是否发生了替换
function cleanGifSearch(pageUrl) {
    const term = pageUrl.searchParams.get('search');
    if (!term) return false;

    const cleaned = cleanSearchTerm(term);
    if (cleaned === term) return false;

    pageUrl.searchParams.set('search', cleaned);
    return true;
}

// 生成目标搜索页地址，GIF 搜索页使用清理后的搜索词
function toSearchUrl(pageUrl, type) {
    pageUrl.pathname = `/${type}/search`;
    if (type.startsWith('gif')) cleanGifSearch(pageUrl);
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

    // 已打开的 GIF 搜索页：地址栏搜索词含特殊字符时直接替换为清理后的地址
    if (/^\/gifs?\/search\/?$/.test(pageUrl.pathname) && cleanGifSearch(pageUrl)) {
        window.location.replace(pageUrl.href);
        return;
    }

    const pageType = pageUrl.pathname.match(/^\/(video|gif|gifs)$/)?.[1];
    if (pageType) {
        window.location.replace(toSearchUrl(pageUrl, pageType).href);
        return;
    }

    const isVideo = pageUrl.pathname.startsWith('/video');
    createSwitchButton(toSearchUrl(pageUrl, isVideo ? 'gif' : 'video'), isVideo);
}
