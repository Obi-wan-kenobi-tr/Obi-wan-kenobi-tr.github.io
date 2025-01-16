document.addEventListener('DOMContentLoaded', function() {
    // Blog yazılarını yükle
    loadPosts();
});

async function loadPosts() {
    try {
        // GitHub API'sini kullanarak posts dizinindeki dosyaları al
        const username = 'GITHUB_KULLANICI_ADINIZ'; // Buraya GitHub kullanıcı adınızı yazın
        const repo = 'GITHUB_KULLANICI_ADINIZ.github.io'; // Repo adınız
        
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/posts`);
        const files = await response.json();
        
        const postsGrid = document.getElementById('posts-grid');
        
        // Her bir post dosyası için kart oluştur
        files.forEach(file => {
            if (file.name.endsWith('.html')) {
                const postCard = createPostCard(file);
                postsGrid.appendChild(postCard);
            }
        });
    } catch (error) {
        console.error('Posts yüklenirken hata oluştu:', error);
    }
}

function createPostCard(file) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    // Dosya adından başlık oluştur
    const title = file.name.replace('.html', '').replace(/-/g, ' ');
    
    card.innerHTML = `
        <h3>${capitalizeWords(title)}</h3>
        <p class="date">Tarih: ${new Date().toLocaleDateString('tr-TR')}</p>
        <a href="posts/${file.name}">Devamını Oku →</a>
    `;
    
    return card;
}

function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
} 