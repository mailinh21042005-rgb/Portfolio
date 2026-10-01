let currentTag = 'All';
export const projects = [
    {
        id: 1, title: 'Phát triển game Asteroids',
        tags: ['C++']},
    {
        id: 2, title: 'Phát triển hệ thống phân loại bệnh trên lá lúa sử dụng SVC, KNN và Random Forest',
        tags: ['Python']},
    {
        id: 3, title: 'Phát triển tool kiểm tra cấu hình bộ điều khiển điện tử ECU',
        tags: ['Python']},
];
const ul = document.querySelector(
  '#project-list');
const tpl = document.querySelector(
  '#project-card');
const bar = document.querySelector('#filters')
const search = document.querySelector('#search');
const contactSection = document.querySelector('#contact');
const floatingBtn = document.querySelector('#floating-contact');

function render(list) {
  ul.textContent = '';
  for (const p of list) {
    const li = tpl.content
      .cloneNode(true);
    li.querySelector('h3')
      .textContent = p.title;
    li.querySelector('.tags')
      .textContent = p.tags.join(', ');
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