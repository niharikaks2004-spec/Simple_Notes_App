let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = null;

const tagList = document.getElementById('tagList');
const clearFilterBtn = document.getElementById('clearFilter');

let activeTag = null;

const list = document.getElementById('list');
const search = document.getElementById('search');
const counter = document.getElementById('counter');
const darkToggle = document.getElementById('darkToggle');

/* DARK MODE */
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

/* ADD NOTE */
document.getElementById('addBtn').onclick = () => {
  const note = {
    title: title.value,
    content: content.value,
    tags: tags.value.split(',').map(t => t.trim()).filter(Boolean),
    pinned: false
  };

  notes.push(note);
  save();
  render();

  title.value = content.value = tags.value = "";
};

/* SEARCH */
search.oninput = () => render(search.value);

/* RENDER */
function render(filter = "") {
  list.innerHTML = "";

  let filtered = notes.filter(n => {
  const matchesSearch =
    n.title.toLowerCase().includes(filter.toLowerCase()) ||
    n.content.toLowerCase().includes(filter.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));

  const matchesTag = activeTag
    ? n.tags.includes(activeTag)
    : true;

  return matchesSearch && matchesTag;
});

clearFilterBtn.onclick = () => {
  activeTag = null;
  render(search.value);
  renderTags();
};

  filtered.sort((a, b) => b.pinned - a.pinned);

  filtered.forEach((n, i) => {
    const li = document.createElement('li');
    li.draggable = true;

    li.innerHTML = `
      <h3>${n.title || "(No title)"}</h3>
      <p>${n.content.substring(0,100)}</p>
      <div>${n.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="actions">
        <button class="pin-btn">📌</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    /* TAG CLICK */
    li.querySelectorAll('.tag').forEach(tag => {
      tag.onclick = () => {
        search.value = tag.textContent;
        render(tag.textContent);
      };
    });

    /* PIN */
    li.querySelector('.pin-btn').onclick = () => {
      n.pinned = !n.pinned;
      save();
      render(search.value);
    };

    /* DELETE */
    li.querySelector('.delete-btn').onclick = () => {
      notes.splice(i, 1);
      save();
      render(search.value);
    };

    /* EDIT */
    li.querySelector('.edit-btn').onclick = () => {
      editIndex = i;
      document.getElementById('editTitle').value = n.title;
      document.getElementById('editContent').value = n.content;
      document.getElementById('editTags').value = n.tags.join(',');
      document.getElementById('modal').style.display = 'flex';
    };

    /* DRAG */
    li.addEventListener('dragstart', () => li.classList.add('dragging'));
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
      save();
    });

    list.appendChild(li);
  });

  counter.textContent = `${notes.length} notes`;
}

function renderTags() {
  tagList.innerHTML = "";

  let allTags = new Set();
  notes.forEach(n => n.tags.forEach(t => allTags.add(t)));

  allTags.forEach(tag => {
    const li = document.createElement('li');
    li.textContent = tag;

    if (tag === activeTag) {
      li.classList.add("active");
    }

    li.onclick = () => {
      activeTag = tag;
      render(search.value);
      renderTags();
    };

    tagList.appendChild(li);
  });
}

/* DRAG REORDER */
list.addEventListener('dragover', e => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const after = [...list.children].find(el =>
    e.clientY <= el.offsetTop + el.offsetHeight / 2
  );

  if (!after) list.appendChild(dragging);
  else list.insertBefore(dragging, after);

  notes = [...list.children].map(li => {
    const title = li.querySelector('h3').textContent;
    return notes.find(n => (n.title || "(No title)") === title);
  });
});

/* SAVE EDIT */
document.getElementById('saveEdit').onclick = () => {
  notes[editIndex] = {
    title: editTitle.value,
    content: editContent.value,
    tags: editTags.value.split(',').map(t => t.trim()),
    pinned: notes[editIndex].pinned
  };

  document.getElementById('modal').style.display = 'none';
  save();
  render();
};

document.getElementById('closeModal').onclick = () => {
  document.getElementById('modal').style.display = 'none';
};

/* SAVE */
function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

renderTags();