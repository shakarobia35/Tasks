
(function () {
    // ---------- 1. 图片懒加载 ----------
    const imgElements = document.querySelectorAll('img[data-src]');
    function loadImg(img) {
        const src = img.getAttribute('data-src');
        if (src && !img.src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    }
    function lazyLoadAll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const winHeight = window.innerHeight;
        for (let img of imgElements) {
            if (img.getAttribute('data-src')) {
                const rect = img.getBoundingClientRect();
                if (rect.top < winHeight + 200 && rect.bottom > -100) {
                    loadImg(img);
                }
            }
        }
    }
    window.addEventListener('scroll', lazyLoadAll);
    window.addEventListener('resize', lazyLoadAll);
    lazyLoadAll();  // 立即加载可视区图片

    // ---------- 2. 导航栏平滑滚动 ----------
    function scrollToElement(selector) {
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    // Introduction 滚动到 .introduction
    const introLink = document.querySelector('#introduction a');
    if (introLink) {
        introLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.introduction');
        });
    }
    // About Us 滚动到 .about-wrapper
    const aboutLink = document.querySelector('#about a');
    if (aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.about-wrapper');
        });
    }
    // Contact Us 滚动到 .contact-wrapper
    const contactLink = document.querySelector('#contact a');
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.contact-wrapper');
        });
    }
    // Q&A 滚动到 .QA-wrapper
    const qaLink = document.querySelector('#qa a');
    if (qaLink) {
        qaLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.QA-wrapper');
        });
    }

    // Introduction 里的大标题点击也滚动到自身
    const introTitle = document.querySelector('#pass-text a');
    if (introTitle) {
        introTitle.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('.introduction');
        });
    }

    // ---------- 3. Q&A 折叠/展开 ----------
    const qaItems = document.querySelectorAll('#QA-ul li');
    qaItems.forEach(item => {
        const questionLink = item.querySelector('.QA-a');
        const answer = item.querySelector('p');
        if (questionLink && answer) {
            // 初始答案隐藏
            answer.style.display = 'none';
            questionLink.addEventListener('click', (e) => {
                e.preventDefault();
                const isVisible = answer.style.display === 'block';
                answer.style.display = isVisible ? 'none' : 'block';
            });
        }
    });

    // ---------- 4. 邮箱复制 (点击 E-mail 链接) ----------
    const emailBtn = document.querySelector('#a2');
    const emailAddress = 'newthread_geek@outlook.com';
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // 现代复制方法
            navigator.clipboard.writeText(emailAddress).then(() => {
                alert('Geek的邮箱已经复制到剪贴板了！♡(*´∀｀*)人(*´∀｀*)♡');
            }).catch(() => {
                // 降级方案
                const textarea = document.createElement('textarea');
                textarea.value = emailAddress;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('Geek的邮箱已经复制到剪贴板了！♡(*´∀｀*)人(*´∀｀*)♡');
            });
        });
    }

    // ---------- 5. 火箭返回顶部 ----------
    const rocket = document.getElementById('pointer2');
    if (rocket) {
        rocket.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- 6. 滚动时显示/隐藏火箭按钮 ----------
    const pointerDiv = document.querySelector('.pointer');
    function toggleRocket() {
        if (window.scrollY > 500) {
            pointerDiv.style.display = 'block';
        } else {
            pointerDiv.style.display = 'none';
        }
    }
    window.addEventListener('scroll', toggleRocket);
    toggleRocket();

    // 保证所有图片在没有 data-src 时不会出错
    console.log("页面已加载，保持好奇心！");
})();
