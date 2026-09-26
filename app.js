// Central Scripts Inventory
const scriptsData = [
    {
        id: 1,
        title: "Modern Pawnshop",
        framework: "qbcore & qbox",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$8.00",
        isFree: false,
        dependencies: "ox_lib, qb-core, qbox",
        image: "https://cdn.discordapp.com/attachments/1331303106503376987/1553294203591721040/pawnshop.png?ex=6ab8b974&is=6ab767f4&hm=af1c60909ab5c593635363ea1e578f3c4cc04432a217efdeca5a21f82569000c&",
        description: "Modern Pawnshop V1 is a premium quality pawnshop system designed for Qbox and QB-Core servers using Ox Inventory and Ox Target. Built with a clean modern interface, advanced cart system, illegal item access system, stock handling, NPC interactions, and optimized event flow. Perfect for realistic economy based RP servers.",
        videoUrl: "https://youtu.be/q6XdlNKYLm4",
        tebexUrl: "https://lee-verse.tebex.io/package/7451197"
    },
    {
        id: 2,
        title: "LV-Oxy | Premium Oxy Run System",
        framework: "qbox & qbcore",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$12.00",
        isFree: false,
        dependencies: "qb-core, qbox",
        image: "https://cdn.discordapp.com/attachments/1331303106503376987/1553318097430257735/system.png?ex=6ab8cfb5&is=6ab77e35&hm=7d26f35a9bd30c54668d64e90a9b30dfc557045c66b0d5b539f20cbbc6b14879&",
        description: "LV-Oxy is a premium-style illegal oxy delivery system built for Qbox & QBCore servers.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io/package/7454290"
    },
    {
        id: 3,
        title: "LB Phone Radio App",
        framework: "qbx-core & qbox",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$0.00",
        isFree: true,
        dependencies: "qbx-core, qbox",
        image: "https://cdn.discordapp.com/attachments/1331303106503376987/1553315364819959949/phone.png?ex=6ab8cd2a&is=6ab77baa&hm=09c973a505765490a12b3b2847302f869ff7a89a251dc85e384ffb1507917298&",
        description: "Perfect for serious RP servers looking for a clean and stable radio system integrated directly into the phone.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io/package/7451184"
    },
    {
        id: 4,
        title: "LV-Nametag",
        framework: "standalone",
        type: "Open Source",
        resmon: "0.01ms",
        price: "$9.00",
        isFree: false,
        dependencies: "No framework needed",
        image: "https://cdn.discordapp.com/attachments/1331303106503376987/1553312941426876546/nametag.png?ex=6ab8cae8&is=6ab77968&hm=b03b8e5b73fece972f5c8fedc306bf59f48d107109c7076058c598a0a804e2e2&",
        description: "This system displays player names along with their server ID above their character, making player identification easy while keeping the roleplay environment immersive and minimalistic. The script also includes a real-time typing indicator, so when a player is typing in chat, a small indicator appears above their nametag. This adds a more interactive and realistic experience for text-based roleplay servers.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io/package/7329365"
    }
];

let activeFilter = 'all';

// Render script cards dynamically
function renderScripts(items) {
    const grid = document.getElementById('scriptsGrid');
    const countElem = document.getElementById('scriptCount');
    if (countElem) {
        countElem.innerText = `${items.length} Products Available`;
    }
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `<div class="col-span-3 text-center py-16 text-slate-500 font-rajdhani uppercase tracking-wider text-sm">No matching scripts found in this category.</div>`;
        return;
    }

    items.forEach(script => {
        const card = document.createElement('div');
        card.className = "glass-box script-card rounded-xl overflow-hidden flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="h-44 w-full relative overflow-hidden bg-slate-900 img-box">
                    <img src="${script.image}" alt="${script.title}" class="w-full h-full object-cover">
                    <span class="absolute top-2.5 right-2.5 bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 text-[10px] px-2 py-0.5 rounded font-mono font-bold">${script.resmon}</span>
                    <span class="absolute top-2.5 left-2.5 bg-[#05070B]/90 border border-white/10 text-white text-[10px] px-2 py-0.5 rounded uppercase font-rajdhani font-bold tracking-wider">${script.framework}</span>
                </div>
                <div class="p-4">
                    <span class="text-[10px] ${script.isFree ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-[#0099FF]/15 text-[#0099FF] border-[#0099FF]/20'} border px-2 py-0.5 rounded font-rajdhani uppercase font-bold tracking-wider inline-block mb-2">
                        ${script.isFree ? 'Free Community' : script.type}
                    </span>
                    <h3 class="text-lg font-bold font-rajdhani uppercase text-white tracking-wide mb-1">${script.title}</h3>
                    <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">${script.description}</p>
                </div>
            </div>
            <div class="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-auto">
                <div>
                    <span class="text-[10px] uppercase font-rajdhani font-bold text-slate-500 block">Price</span>
                    <span class="text-lg font-mono font-bold ${script.isFree ? 'text-emerald-400' : 'text-white'}">${script.isFree ? 'FREE' : script.price}</span>
                </div>
                <button onclick="openModal(${script.id})" class="px-4 py-1.5 rounded-lg border border-[#0099FF]/30 text-[#0099FF] hover:bg-[#0099FF] hover:text-white text-xs font-bold font-rajdhani uppercase tracking-wider transition">
                    Details →
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Category filter handler
function filterScripts(category) {
    activeFilter = category;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.className = "tab-btn px-3.5 py-1.5 rounded-md bg-[#0099FF] text-white transition whitespace-nowrap";
        } else {
            btn.className = "tab-btn px-3.5 py-1.5 rounded-md text-slate-400 hover:text-white transition whitespace-nowrap";
        }
    });
    applyFilters();
}

// Realtime search listener
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const filtered = scriptsData.filter(item => {
        let matchesCategory = false;
        if (activeFilter === 'all') matchesCategory = true;
        else if (activeFilter === 'free') matchesCategory = item.isFree === true;
        else matchesCategory = item.framework.toLowerCase().includes(activeFilter.toLowerCase());

        const matchesSearch = item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    renderScripts(filtered);
}

// Product Modal logic
function openModal(id) {
    const item = scriptsData.find(s => s.id === id);
    if (!item) return;

    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalFramework').innerText = item.framework;
    document.getElementById('modalDesc').innerText = item.description;
    document.getElementById('modalResmon').innerText = item.resmon;
    document.getElementById('modalDeps').innerText = item.dependencies;
    document.getElementById('modalType').innerText = item.type;
    document.getElementById('modalPrice').innerText = item.isFree ? 'FREE' : item.price;
    document.getElementById('modalVideo').href = item.videoUrl;

    const buyBtn = document.getElementById('modalBuyLink');
    buyBtn.innerText = item.isFree ? "DOWNLOAD FREE" : "GET SCRIPT";
    buyBtn.href = item.tebexUrl;
    buyBtn.target = "_blank";
    buyBtn.onclick = null; // Purana API event handler clear

    document.getElementById('detailModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

const detailModalElem = document.getElementById('detailModal');
if (detailModalElem) {
    detailModalElem.addEventListener('click', (e) => {
        if (e.target.id === 'detailModal') closeModal();
    });
}

// Tebex Checkout Trigger API
async function triggerCheckout(packageId) {
    const buyBtn = document.getElementById('modalBuyLink');
    const originalText = buyBtn.innerText;
    buyBtn.innerText = "Connecting to FiveM / Tebex...";
    buyBtn.style.pointerEvents = "none";

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId: packageId })
        });

        const data = await response.json();

        if (data && data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
        } else {
            console.error("Tebex API error:", data);
            alert("Checkout error: " + (data.error || "Failed to create basket"));
            buyBtn.innerText = originalText;
            buyBtn.style.pointerEvents = "auto";
        }
    } catch (err) {
        console.error("Fetch checkout error:", err);
        alert("Server error connecting to Tebex.");
        buyBtn.innerText = originalText;
        buyBtn.style.pointerEvents = "auto";
    }
}

// Policies & Legal Modals Data & Handler
const policiesContent = {
    refund: {
        title: "Refund Policy",
        body: `
            <div class="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-300 font-bold mb-3 font-rajdhani uppercase tracking-wide">
                Strict Non-Refundable Digital Goods Notice
            </div>
            <p><strong>Your money is not refundable! Until or unless we are unable to fix your issue.</strong></p>
            <p>Because digital FiveM assets are granted immediately to your CFX Keymaster account via Tebex upon payment, all sales are final.</p>
            <p>However, we always provide our customers the best service and help our customers to fix any valid issue or bug that might occur while using our scripts. We put a lot of effort into making sure that we satisfy every single customer.</p>
            <p class="pt-2">For support, bug inquiries, or assistance, contact: <br><strong class="text-[#00E5FF]">iamelixir88@gmail.com</strong> or create a ticket on our official <a href="https://discord.gg/pbUQCPapH2" target="_blank" class="text-[#0099FF] underline">Discord Server</a>.</p>
            <p class="text-[11px] text-slate-500 font-mono mt-3">ALL RIGHTS RESERVED TO #lee.org1101</p>
        `
    },
    tos: {
        title: "Terms of Service",
        body: `
            <p>By purchasing or using any asset from <strong>LV STUDIOS</strong>, you agree to the following terms:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>You are granted a non-transferable license tied directly to your FiveM Keymaster account.</li>
                <li>Leaking, reselling, sharing, or attempting to decrypt or reverse-engineer escrow-protected files will result in an immediate and permanent license revocation and blacklisting.</li>
                <li>Support is provided exclusively through our official Discord ticket system to verified buyers.</li>
                <li>All rights and code ownership remain reserved to <strong class="text-white">#lee.org1101</strong> (Developers: Lee & Panther).</li>
            </ul>
        `
    },
    privacy: {
        title: "Privacy Policy",
        body: `
            <p>Your privacy is respected at LV STUDIOS.</p>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>We do not collect, store, or sell any personal banking or card credentials. All billing is processed securely by <strong>Tebex Limited</strong>.</li>
                <li>We only receive transaction identifiers, your selected username, and your FiveM Keymaster account identifier strictly for license fulfillment.</li>
            </ul>
        `
    },
    escrow: {
        title: "CFX Escrow Guidelines",
        body: `
            <p>All commercial scripts in LV STUDIOS utilize the official <strong>CFX Keymaster Asset Escrow System</strong>.</p>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Ensure you are logged into the correct Keymaster account during checkout. Assets cannot be transferred to a different account once granted.</li>
                <li>Config files, locales/languages, and HTML/CSS/JS frontend NUI files remain open and editable for seamless server customization.</li>
            </ul>
        `
    }
};

function openPolicyModal(type) {
    const data = policiesContent[type];
    if (!data) return;

    document.getElementById('policyModalTitle').innerText = data.title;
    document.getElementById('policyModalBody').innerHTML = data.body;
    document.getElementById('policyModal').classList.remove('hidden');
}

function closePolicyModal() {
    document.getElementById('policyModal').classList.add('hidden');
}

const policyModalElem = document.getElementById('policyModal');
if (policyModalElem) {
    policyModalElem.addEventListener('click', (e) => {
        if (e.target.id === 'policyModal') closePolicyModal();
    });
}

async function triggerCheckout(packageId) {
    const buyBtn = document.getElementById('modalBuyLink');
    const originalText = buyBtn.innerText;
    buyBtn.innerText = "Connecting to FiveM / Tebex...";
    buyBtn.style.pointerEvents = "none";

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId: packageId })
        });

        const data = await response.json();

        if (data && data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
        } else {
            console.error("Tebex API error full object:", data);
            const detailMsg = data.details ? JSON.stringify(data.details) : (data.error || "Unknown error");
            alert("Tebex Response: " + detailMsg);
            buyBtn.innerText = originalText;
            buyBtn.style.pointerEvents = "auto";
        }
    } catch (err) {
        console.error("Fetch checkout error:", err);
        alert("Server error connecting to Tebex.");
        buyBtn.innerText = originalText;
        buyBtn.style.pointerEvents = "auto";
    }
}
// Initial run
renderScripts(scriptsData);
