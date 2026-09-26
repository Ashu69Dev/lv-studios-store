// Central Scripts Inventory
const scriptsData = [
    {
        id: 1,
        title: "Modern Pawnshop",
        framework: "qbcore & qbox",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$19.99",
        isFree: false,
        dependencies: "ox_lib, qb-core, qbox",
        image: "https://cdn.discordapp.com/attachments/1331303106503376987/1553294203591721040/pawnshop.png?ex=6ab8b974&is=6ab767f4&hm=af1c60909ab5c593635363ea1e578f3c4cc04432a217efdeca5a21f82569000c&",
        description: "Modern Pawnshop V1 is a premium quality pawnshop system designed for Qbox and QB-Core servers using Ox Inventory and Ox Target.Built with a clean modern interface, advanced cart system, illegal item access system, stock handling, NPC interactions, and optimized event flow.Perfect for realistic economy based RP servers.",
                     
        videoUrl: "https://youtu.be/q6XdlNKYLm4",
        tebexUrl: "https://lee-verse.tebex.io"
    },
    {
        id: 2,
        title: "Qbox Inventory & HUD",
        framework: "qbox",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$24.99",
        isFree: false,
        dependencies: "qbx_core, ox_lib",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        description: "Custom designed inventory interface built natively for Qbox framework with smooth drag & drop mechanics.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io"
    },
    {
        id: 3,
        title: "Dynamic Garage & Impound",
        framework: "esx",
        type: "Escrow",
        resmon: "0.00ms",
        price: "$22.50",
        isFree: false,
        dependencies: "es_extended, ox_target",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        description: "Complete vehicle storage system with visual custom damage save, impound bail fees, and shared private garages.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io"
    },
    {
        id: 4,
        title: "Cyber Status HUD",
        framework: "standalone",
        type: "Open Source",
        resmon: "0.01ms",
        price: "$14.99",
        isFree: false,
        dependencies: "ox_lib (Optional)",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        description: "Minimalist player status with vehicle speedometer dashboard, stress indicator, and ultra-smooth CSS keyframe transitions.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io"
    },
    {
        id: 5,
        title: "Minimalist Car Hud Speedo",
        framework: "standalone",
        type: "Open Source",
        resmon: "0.00ms",
        price: "$0.00",
        isFree: true,
        dependencies: "None (Standalone)",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        description: "Completely free open-source vehicle dashboard with fuel gauge, RPM indicator, and seatbelt sound effects.",
        videoUrl: "https://www.youtube.com/@LeeVerse5m",
        tebexUrl: "https://lee-verse.tebex.io"
    }
];

let activeFilter = 'all';

// Render script cards dynamically
function renderScripts(items) {
    const grid = document.getElementById('scriptsGrid');
    const countElem = document.getElementById('scriptCount');
    countElem.innerText = `${items.length} Products Available`;
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
document.getElementById('searchInput').addEventListener('input', applyFilters);

function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = scriptsData.filter(item => {
        let matchesCategory = false;
        if (activeFilter === 'all') matchesCategory = true;
        else if (activeFilter === 'free') matchesCategory = item.isFree === true;
        else matchesCategory = item.framework.toLowerCase() === activeFilter;

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
    document.getElementById('modalBuyLink').href = item.tebexUrl;

    document.getElementById('detailModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') closeModal();
});

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

document.getElementById('policyModal').addEventListener('click', (e) => {
    if (e.target.id === 'policyModal') closePolicyModal();
});

// Initial run
renderScripts(scriptsData);
