<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
    // 1. Tìm khung chứa video trong bài viết
    var videoFrame = document.querySelector('.pframe');
    
    // Nếu trang này không có video, dừng lại không làm gì cả
    if (!videoFrame) return;

    // 2. Chèn CSS (Tự động thiết lập giao diện mà không cần sửa file CSS riêng)
    var style = document.createElement('style');
    style.innerHTML = `
        .pframe { position: relative; overflow: hidden; }
        #introBox { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 20; transition: opacity 0.4s ease; display: block; }
        .pre-view-img { width: 100%; height: 100%; object-fit: cover; cursor: pointer; display: block; }
        .skip-btn { position: absolute; bottom: 20px; right: 20px; background-color: rgba(0, 0, 0, 0.8); color: #fff; padding: 8px 15px; border-radius: 4px; font-family: sans-serif; font-size: 13px; user-select: none; z-index: 21; border: 1px solid rgba(255, 255, 255, 0.3); transition: background-color 0.2s; }
        .skip-btn.ready { cursor: pointer; background-color: rgba(20, 20, 20, 0.9); }
        .skip-btn.ready:hover { background-color: #d63031; border-color: #d63031; }
    `;
    document.head.appendChild(style);

    // 3. Cấu hình thông tin hiển thị 
    var targetUrl = "LINK_TRANG_DICH_CUA_BAN"; 
    var imageUrl = "LINK_HINH_ANH_CUA_BAN";

    // 4. Tạo khối hiển thị và chèn đè lên trên iframe
    var introBox = document.createElement('div');
    introBox.id = 'introBox';
    introBox.innerHTML = `
        <a href="${targetUrl}" target="_blank" rel="nofollow">
            <img src="${imageUrl}" alt="Preview" class="pre-view-img">
        </a>
        <div id="skipAction" class="skip-btn">Bỏ qua sau <span id="timeCount">5</span>s</div>
    `;
    videoFrame.appendChild(introBox);

    // 5. Chức năng đếm ngược
    var skipAction = document.getElementById('skipAction');
    var timeCount = document.getElementById('timeCount');
    var timeLeft = 5; // Có thể thay đổi số giây tại đây

    var timer = setInterval(function() {
        timeLeft--;
        if (timeLeft > 0) {
            timeCount.innerText = timeLeft;
        } else {
            // Khi hết thời gian đếm ngược
            clearInterval(timer);
            skipAction.innerHTML = 'Bỏ qua ngay ➔';
            skipAction.classList.add('ready');
            
            // Xử lý khi click vào nút "Bỏ qua ngay"
            skipAction.addEventListener('click', function(e) {
                e.preventDefault(); 
                e.stopPropagation(); // Tránh click dính vào link ảnh bên dưới
                
                introBox.style.opacity = '0'; // Hiệu ứng mờ dần
                
                // Xóa hoàn toàn khối introBox khỏi web sau khi mờ xong (400ms)
                setTimeout(function() {
                    if(introBox.parentNode) {
                        introBox.parentNode.removeChild(introBox);
                    }
                }, 400); 
            });
        }
    }, 1000);
});
</script>