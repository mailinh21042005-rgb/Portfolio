import { loadRepos } from './repos.js';
let currentTag = 'All';
export const projects = [
    {
        id: 1, 
        title: 'Phát triển game Asteroids',
        tags: ['C++'],
        mindmapData: {
            top: 'Xây dựng thiết kế UI/UX và gameplay chiến đấu', 
            right: 'Cải thiện trải nghiệm cho người dùng', 
            bottom: 'C++, 2025', 
            left: 'Nâng cấp đồ họa và âm thanh' 
        }
    },
    {
        id: 2, 
        title: 'Phát triển hệ thống phân loại bệnh trên lá lúa sử dụng SVC, KNN và Random Forest',
        tags: ['Python'],
        mindmapData: {
            top: 'Sử dụng Học Máy để phân loại bệnh trên lá lúa', 
            right: 'Giao diện web để người dùng thao tác thông qua Streamlit', 
            bottom: 'Python, 2025', 
            left: 'Mô hình có độ khử nhiễu tốt và độ chính xác cao' 
        }
    },
    {
        id: 3, 
        title: 'Phát triển tool kiểm tra cấu hình bộ điều khiển điện tử ECU',
        tags: ['Python'],
        mindmapData: {
            top: 'Nhận diện số liệu trong ECU Config Sheet và trích xuất sang file .seq', 
            right: 'Chuẩn bị dữ liệu đầu vào cho tool TKWinX sử dụng để nhúng dữ liệu', 
            bottom: 'Python, 2026', 
            left: 'Đang tiếp tục phát triển' 
        }
    }
];

const state = document.querySelector('#repos-state');
const list = document.querySelector('#repo-list');
const ul = document.querySelector(
  '#project-list');
const tpl = document.querySelector(
  '#project-card');
const bar = document.querySelector('#filters')
const search = document.querySelector('#search');
const contactSection = document.querySelector('#contact');
const floatingBtn = document.querySelector('#floating-contact');
const elementsToReveal = document.querySelectorAll('.hero, section, .card, .skills-grid, .site-footer');

elementsToReveal.forEach((el) => {
    el.classList.add('reveal')
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); 
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
});

elementsToReveal.forEach(el => revealObserver.observe(el));

function createSakura() {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 7 + 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 5 + 5; 
    petal.style.animation = `fall ${duration}s linear infinite`;
    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000); 
}

function repoCard(r) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = r.url;
  a.textContent = r.name;
  const p = document.createElement('p');
  p.textContent = `★ ${r.stars} · ${r.desc}`;
  li.append(a, p);
  return li;
}

setInterval(createSakura, 300);

function render(list) {
  ul.textContent = '';
  for (const p of list) {
    const li = tpl.content
      .cloneNode(true);
    li.querySelector('h3')
      .textContent = p.title;
    li.querySelector('.tags')
      .textContent = p.tags.join(', ');
    const cardElement = li.querySelector('.card');
        if (cardElement) {
            cardElement.dataset.id = p.id;   
            cardElement.classList.add('reveal');
            revealObserver.observe(cardElement);
        }
    ul.append(li);
  }
}

const tags = [...new Set(projects.flatMap((p) => p.tags))];
for (const tag of ['All', ...tags]) {
    const b = document.createElement('button');
    b.textContent = tag;
    b.dataset.tag = tag;
    bar.append(b);
}

bar.addEventListener('click', (e) => {
  const tag = e.target.dataset.tag;
  if (!tag) return;

  currentTag = tag;
  const q = search.value.toLowerCase().trim();

  const filtered = projects.filter((p) =>
        (currentTag === 'All' || p.tags.includes(currentTag)) &&
        p.title.toLowerCase().includes(q)
    );

    render(filtered);
});

search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = projects.filter((p) => 
            (currentTag === 'All' || p.tags.includes(currentTag)) &&  
            p.title.toLowerCase().includes(q)
    );
    render(filtered)
});

if (contactSection && floatingBtn) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                floatingBtn.classList.add('show'); // Hiện nút
            } else {
                floatingBtn.classList.remove('show'); // Ẩn nút đi
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    observer.observe(contactSection);
}
render(projects);

let currentOpenCardId = null;

ul.addEventListener('click', function(e) {
    const clickedCard = e.target.closest('.card');
    if (!clickedCard) return;

    const mindmapContainer = document.querySelector('#mindmap-container');
    if (!mindmapContainer) return; 

    const mmTitle = document.querySelector('#mm-title');
    const mmTop = document.querySelector('#mm-top');
    const mmRight = document.querySelector('#mm-right');
    const mmBottom = document.querySelector('#mm-bottom');
    const mmLeft = document.querySelector('#mm-left');

    const projectId = parseInt(clickedCard.dataset.id);

    if (currentOpenCardId === projectId) {
        mindmapContainer.classList.remove('show');
        clickedCard.classList.remove('active-card');
        currentOpenCardId = null;
    } 
    else {
        const oldActiveCard = ul.querySelector('.active-card');
        if (oldActiveCard) oldActiveCard.classList.remove('active-card');

        const project = projects.find(p => p.id === projectId);

        if (project) {
            if (mmTitle) mmTitle.textContent = project.title; 
            
            if (project.mindmapData) {
                if (mmTop) mmTop.textContent = project.mindmapData.top;
                if (mmRight) mmRight.textContent = project.mindmapData.right;
                if (mmBottom) mmBottom.textContent = project.mindmapData.bottom;
                if (mmLeft) mmLeft.textContent = project.mindmapData.left;
            }
            
            mindmapContainer.classList.add('show');
            clickedCard.classList.add('active-card');
            currentOpenCardId = projectId;
            
            setTimeout(() => {
                mindmapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
});

async function showRepos(user) {
  state.textContent = 'Đang tải…';
  list.textContent = '';
  try {
    const repos = await loadRepos(user);
    state.textContent = repos.length ? ''
      : 'Chưa có repo công khai.';
    repos.forEach((r) => list.append(repoCard(r)));
  } catch (err) {
    state.textContent = 'Không tải được: ' + err.message;
    const again = document.createElement('button');
    again.textContent = 'Thử lại';
    again.onclick = () => showRepos(user);
    state.append(again);
  }
}
showRepos('Linh Nguyễn Thị Mai');