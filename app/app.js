(function () {
    const KEY = 'sidebar-open';
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');

    document.querySelectorAll('details[data-path]').forEach(function (el) {
        if (saved.includes(el.dataset.path)) el.open = true;

        el.addEventListener('toggle', function () {
            const current = JSON.parse(localStorage.getItem(KEY) || '[]');
            const path = el.dataset.path;
            const idx = current.indexOf(path);
            if (el.open && idx === -1) current.push(path);
            if (!el.open && idx !== -1) current.splice(idx, 1);
            localStorage.setItem(KEY, JSON.stringify(current));
        });
    });

    // Re-enable transitions after two frames (ensures browser has painted first)
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            document.documentElement.classList.remove('notransition');
        });
    });
})();

(function () {
    var THEMES = ['light', 'dark', 'hacker', 'warm', 'nord'];

    function setTheme(name) {
        if (!THEMES.includes(name)) return;
        document.documentElement.setAttribute('data-theme', name);
        localStorage.setItem('theme', name);
        updateActiveCard();
        updateHomeView(name);
    }

    var manifestoFetched = false;
    function updateHomeView(theme) {
        var hackerEl  = document.getElementById('hacker-home');
        var defaultEl = document.getElementById('default-home');
        if (!hackerEl) return;
        if (theme === 'hacker') {
            defaultEl.style.display = 'none';
            hackerEl.style.display  = '';
            if (!manifestoFetched) {
                manifestoFetched = true;
                fetch('/manifesto.txt')
                    .then(function(r) { return r.text(); })
                    .then(function(t) { document.getElementById('manifesto-text').textContent = t; })
                    .catch(function() { document.getElementById('manifesto-text').textContent = '// connection refused'; });
            }
        } else {
            hackerEl.style.display  = 'none';
            defaultEl.style.display = '';
        }
    }

    updateHomeView(localStorage.getItem('theme') || 'light');

    function updateActiveCard() {
        var current = localStorage.getItem('theme') || 'light';
        document.querySelectorAll('.theme-card').forEach(function (card) {
            card.classList.toggle('is-active', card.dataset.theme === current);
        });
    }

    document.querySelectorAll('.theme-card').forEach(function (card) {
        card.addEventListener('click', function () { setTheme(card.dataset.theme); });
    });

    updateActiveCard();
})();

(function () {
    var btn    = document.getElementById('settings-btn');
    var panel  = document.getElementById('settings-panel');
    var close  = document.getElementById('settings-close');
    var isOpen = false;

    function openPanel() {
        isOpen = true;
        panel.getBoundingClientRect(); // force reflow
        panel.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
    }

    function closePanel() {
        isOpen = false;
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        isOpen ? closePanel() : openPanel();
    });

    close.addEventListener('click', closePanel);

    document.addEventListener('click', function (e) {
        if (isOpen && !panel.contains(e.target)) closePanel();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closePanel();
    });
})();

(function () {
    var btn = document.getElementById('sidebar-toggle');
    var html = document.documentElement;
    function isCollapsed() { return html.classList.contains('sidebar-collapsed'); }
    function updateBtn() {
        btn.textContent = isCollapsed() ? '→' : '_';
        btn.title = isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar';
        btn.setAttribute('aria-label', isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar');
    }
    updateBtn();
    btn.addEventListener('click', function () {
        html.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar-collapsed', isCollapsed() ? '1' : '0');
        updateBtn();
    });
})();

(function () {
    document.querySelectorAll('article pre').forEach(function (pre) {
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'copy';
        btn.addEventListener('click', function () {
            var code = pre.querySelector('code');
            var text = (code || pre).innerText;
            navigator.clipboard.writeText(text).then(function () {
                btn.textContent = 'copied!';
                setTimeout(function () { btn.textContent = 'copy'; }, 1500);
            });
        });
        pre.appendChild(btn);
    });
})();

(function () {
    var bar   = document.getElementById('doc-bar');
    var crumb = document.getElementById('doc-bar-crumb');
    if (!bar) return;

    var content  = document.getElementById('content');
    var article  = document.querySelector('article');
    var headings = Array.from(article.querySelectorAll('h1,h2,h3,h4,h5,h6'));

    // Inject IDs and hover anchor links
    headings.forEach(function (h) {
        var slug = h.textContent.trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        h.id = slug;
        var a = document.createElement('a');
        a.className = 'heading-anchor';
        a.href = '#' + slug;
        a.innerHTML = h.innerHTML;
        h.innerHTML = '';
        h.appendChild(a);
    });

    // Update crumb with the last heading scrolled past (skip h1)
    content.addEventListener('scroll', function () {
        var scrollTop = content.scrollTop + 8;
        var current = null;
        headings.forEach(function (h) {
            if (h.offsetTop <= scrollTop) current = h;
        });
        crumb.textContent = (current && current.tagName !== 'H1')
            ? current.querySelector('.heading-anchor').textContent
            : '';
    });
})();
