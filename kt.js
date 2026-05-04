<script type="text/javascript">
//<![CDATA[
document.addEventListener("DOMContentLoaded", function() {
    // Quét tìm khung video mỗi 1 giây (để chờ template phim load xong cấu trúc)
    var tryInit = setInterval(function() {
        var playerContainer = document.getElementById('PlayVideo');
        
        // Nếu tìm thấy khung PlayVideo và chưa có hình nào được chèn
        if (playerContainer && !document.getElementById('introBox')) {
            clearInterval(tryInit); // Dừng quét

            var targetUrl = "https://s.shopee.vn/4VJb58jLIX"; 
            var imageUrl = "https://kenh14cdn.com/thumb_w/1200/2018/12/5/photo-4-15439785647641056293963-crop-15439788580862065231401.jpg";

            // Bắt buộc khung cha phải relative để hình nằm gọn bên trong
            playerContainer.style.position = 'relative';

            // Tạo khối hình ảnh đè lên trên cùng
            var introBox = document.createElement('div');
            introBox.id = 'introBox';
            introBox.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:#000; z-index:9999;';

            introBox.innerHTML = '<a href="' + targetUrl + '" target="_blank" style="display:block; width:100%; height:100%;"><img src="' + imageUrl + '" style="width:100%; height:100%; object-fit:cover; display:block;"></a><div id="skipAction" style="position:absolute; bottom:15px; right:15px; background:rgba(0,0,0,0.8); color:#fff; padding:8px 15px; border-radius:4px; font-family:sans-serif; font-size:13px; cursor:default; border:1px solid #fff;">Bỏ qua sau <span id="timeCount">5</span>s</div>';
            
            playerContainer.appendChild(introBox);

            // Chạy đếm ngược
            var skipAction = document.getElementById('skipAction');
            var timeCount = document.getElementById('timeCount');
            var timeLeft = 5;

            var timer = setInterval(function() {
                timeLeft--;
                if (timeLeft > 0) {
                    timeCount.innerText = timeLeft;
                } else {
                    clearInterval(timer);
                    skipAction.innerHTML = 'Bỏ qua ngay ➔';
                    skipAction.style.cursor = 'pointer';
                    skipAction.style.background = '#d63031';
                    
                    // Click để tắt hình
                    skipAction.onclick = function(e) {
                        e.preventDefault();
                        introBox.style.display = 'none';
                    };
                }
            }, 1000);
        }
    }, 1000);
    
    // Tự động hủy lệnh tìm kiếm sau 15 giây nếu trang đó thật sự không có video, giúp web không bị nặng
    setTimeout(function() { clearInterval(tryInit); }, 15000);
});
//]]>
</script>
