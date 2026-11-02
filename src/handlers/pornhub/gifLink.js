export default function addGifLink(tracker) {
    // 监听包含 [data-gif] 属性的元素
    tracker.track('div[data-gif]', wrapper => {
        if (wrapper.querySelector('.custom-gif-link-btn')) return;   // 防止重复添加按钮

        const button = document.createElement('a');
        button.href = wrapper.getAttribute('data-gif'); // 获取 GIF 链接
        button.target = '_blank';
        button.innerText = 'GIF';
        button.className = 'custom-gif-link-btn';
        // 设置按钮样式
        Object.assign(button.style, {
            position: 'absolute',
            right: '2px',
            bottom: '2px',
            width: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '2px 4px',
            borderRadius: '3px',
            fontSize: '12px',
            zIndex: '10',
            pointerEvents: 'auto'
        });
        // 将按钮添加到 GIF 父元素中
        wrapper.parentElement.appendChild(button);
        // 将按钮添加到 GIF 元素中
        setTimeout(() => {
            wrapper.appendChild(button);
        }, 1500);
    });
}
