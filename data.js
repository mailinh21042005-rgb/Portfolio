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
render(projects);

const tags = [...new Set(
    projects.flatMap((p) => p.tags),
)];
const bar = document.querySelector(
    '#filters');

for (const tag of ['all', ...tags]) {
    const b = document.createElement(
        'button');
    b.textContent = tag;
    b.dataset.tag = tag;
    bar.append(b);
}

bar.addEventListener('click', (e) => {
  const tag = e.target.dataset.tag;
  if (!tag) return;

  const filtered = tag === 'all'
    ? projects
    : projects.filter((p) =>
        p.tags.includes(tag));

  render(filtered);
});