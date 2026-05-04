<!-- Trinhedit API KK -->
<script type='text/javascript'>
//<![CDATA[
// === MODULE 2: AUTO API KKPHIM (Hỗ trợ Multi-Server) ===

document.addEventListener("DOMContentLoaded", function() {
    const cfg = document.getElementById('MovieConfig');
    if(cfg) {
        const sKK = cfg.getAttribute('data-slug-kk');
        if(sKK) load_KK(sKK);
    }
});

function load_KK(slug) {
    const list = document.getElementById('KKphim');
    
    fetch(`https://phimapi.com/phim/${slug}`)
    .then(res => res.json())
    .then(data => {
        list.innerHTML = ''; // Xóa nội dung cũ (Đang tải...)

        if(data.episodes && data.episodes.length > 0) {
            
            // --- VÒNG LẶP QUÉT TẤT CẢ SERVER ---
            // data.episodes là mảng chứa [Vietsub, Thuyết Minh...]
            data.episodes.forEach(server => {
                
                // 1. Tạo tiêu đề Server (VD: #Hà Nội (Thuyết Minh))
                const title = document.createElement('div');
                title.className = 'server-title';
                // Làm sạch tên: Bỏ dấu # ở đầu cho đẹp
                let cleanName = server.server_name.replace('#', '').trim();
                title.innerText = cleanName;
                list.appendChild(title);

                // 2. Lấy danh sách tập của server này
                const items = server.server_data;
                
                // 3. Tạo nút bấm cho từng tập
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<div class="DagPlayOpt" data-embed="${item.link_embed}" onclick="clickEp(this)"><span>${item.name}</span></div>`;
                    list.appendChild(li);
                });
            });

            // Gọi hàm check lịch sử (Module 1) để tô màu tập đã xem
            if(typeof checkWatched === "function") {
                checkWatched();
            }

        } else { 
            list.innerHTML = '<li style="color:red">KK: Chưa cập nhật phim này.</li>'; 
        }
    })
    .catch(e => { 
        console.error(e);
        list.innerHTML = '<li style="color:red">KK: Lỗi kết nối API.</li>'; 
    });
}
//]]>
</script>
    
<!-- Trinhedit API OP -->
<script>
//<![CDATA[
document.addEventListener("DOMContentLoaded", function() {
    var movieConfig = document.getElementById('MovieConfig');
    if (!movieConfig) return;

    var slugOp = movieConfig.getAttribute('data-slug-op');
    
    if (slugOp) {
        var apiUrl = "https://ophim1.com/v1/api/phim/" + slugOp;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status && data.data.item) {
                    var movie = data.data.item;
                    var html = '';
                    
                    // Duyệt qua từng server (Vietsub, Thuyết Minh, v.v...)
                    movie.episodes.forEach(function(server) {
                        // Thêm tiêu đề cho từng server
                        html += `<div class="server-title">${server.server_name}</div>`;
                        
                        // Duyệt qua từng tập phim của server đó
                        server.server_data.forEach(function(ep) {
                            // Xử lý link để tránh lỗi 403 SAMEORIGIN (nếu cần)
                            var cleanLink = ep.link_embed;
                            if (cleanLink.includes('vip.opstream90.com/share/')) {
                                cleanLink = cleanLink.replace('/share/', '/embed/');
                            }

                            html += `<li> 
                                        <div class="DagPlayOpt" data-embed="${cleanLink}" onclick="clickEp(this)"> 
                                            <span>${ep.name}</span> 
                                        </div> 
                                     </li>`;
                        });
                    });
                    
                    document.getElementById('Ophim').innerHTML = html;
                } else {
                    document.getElementById('Ophim').innerHTML = '<li style="color:red; padding:10px;">Không tìm thấy phim trên Ophim!</li>';
                }
            })
            .catch(err => {
                console.error("Lỗi API Ophim:", err);
                document.getElementById('Ophim').innerHTML = '<li style="color:red; padding:10px;">Lỗi tải dữ liệu từ Ophim!</li>';
            });
    }
});
//]]>
</script>
    
<!-- Trinhedit API NC -->   
<script>
//<![CDATA[
document.addEventListener("DOMContentLoaded", function() {
    var config = document.getElementById('MovieConfig');
    if (!config) return;

    var slugNC = config.getAttribute('data-slug-nc');
    var ncContainer = document.getElementById('NguonC');

    if (slugNC && ncContainer) {
        var apiUrl = "https://phim.nguonc.com/api/film/" + slugNC;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "success" && data.movie && data.movie.episodes) {
                    var html = '';
                    
                    // NguonC có thể có nhiều server (Vietsub, Thuyết minh)
                    data.movie.episodes.forEach(function(server) {
                        html += `<div class="server-title">${server.server_name}</div>`;
                        
                        server.items.forEach(function(ep) {
                            // Sử dụng ep.embed (link nhúng) để tránh lỗi 403 sameorigin
                            html += `<li> 
                                        <div class="DagPlayOpt" data-embed="${ep.embed}" onclick="clickEp(this)"> 
                                            <span>${ep.name}</span> 
                                        </div> 
                                     </li>`;
                        });
                    });
                    
                    ncContainer.innerHTML = html;
                } else {
                    ncContainer.innerHTML = '<li style="color:red; padding:10px;">Không tìm thấy phim trên NguonC!</li>';
                }
            })
            .catch(err => {
                console.error("Lỗi API NguonC:", err);
                ncContainer.innerHTML = '<li style="color:red; padding:10px;">Lỗi kết nối NguonC!</li>';
            });
    }
});
//]]>
</script>