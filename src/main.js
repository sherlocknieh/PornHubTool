
import initVideoHandler from './handlers/video.js';
import initPornhubHandler from './handlers/pornhub/index.js';
import initGreasyforkHandler from './handlers/greasyfork.js';
import initTekjamHandler from './handlers/tekjam.js';

// 初始化所有功能模块
initVideoHandler();
initPornhubHandler();
initGreasyforkHandler();
initTekjamHandler();