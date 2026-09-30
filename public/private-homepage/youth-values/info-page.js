(function () {
  const lock = window.YOUTH_VALUES_LOCKED;
  const payloadKey = "youth-values-unlocked-payload-v1";
  const unlockShell = document.getElementById("unlockShell");
  const appShell = document.getElementById("appShell");
  const form = document.getElementById("unlockForm");
  const input = document.getElementById("passwordInput");
  const button = document.getElementById("unlockButton");
  const error = document.getElementById("unlockError");
  const lockButton = document.getElementById("lockButton");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    button.disabled = true;
    button.textContent = "解锁中";
    try {
      const payload = await decryptPayload(input.value);
      sessionStorage.setItem(payloadKey, JSON.stringify(payload));
      setup(payload);
      input.value = "";
    } catch (_) {
      error.textContent = "密码不正确，或加密数据无法解锁。";
    } finally {
      button.disabled = false;
      button.textContent = "解锁";
    }
  });

  lockButton.addEventListener("click", () => {
    sessionStorage.removeItem(payloadKey);
    sessionStorage.removeItem("youth-values-progress-v1");
    appShell.classList.add("is-hidden");
    unlockShell.classList.remove("is-hidden");
    input.focus();
  });

  async function decryptPayload(password) {
    const bytes = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: bytes(lock.salt), iterations: lock.iterations, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(lock.iv) }, key, bytes(lock.payload));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function setup(data) {
    unlockShell.classList.add("is-hidden");
    appShell.classList.remove("is-hidden");
    if (document.body.dataset.infoPage === "dimensions") renderDimensions(data);
    if (document.body.dataset.infoPage === "method") renderSources(data);
  }

  function renderDimensions(data) {
    const root = document.getElementById("constructCatalog");
    root.innerHTML = data.domains.map((domain) => {
      const cards = data.constructs.filter((construct) => construct.domain === domain.id).map((construct) => `
        <article class="construct-card" style="--construct-color:${domain.color}">
          <small>${construct.code} · ${construct.low} ↔ ${construct.high}</small>
          <h3>${construct.name}</h3>
          <p>${construct.description}</p>
        </article>`).join("");
      return `<section class="result-section"><div class="section-heading compact"><p class="eyebrow">${domain.code} domain</p><h2>${domain.name}</h2></div><div class="construct-catalog">${cards}</div></section>`;
    }).join("");
  }

  function renderSources(data) {
    const root = document.getElementById("methodSources");
    root.innerHTML = data.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>`).join("");
  }

  const cached = sessionStorage.getItem(payloadKey);
  if (cached) {
    try { setup(JSON.parse(cached)); } catch (_) { sessionStorage.removeItem(payloadKey); }
  }
})();
