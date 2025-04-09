// 修复手机回车键问题 + 自动聚焦密码框
document.addEventListener('DOMContentLoaded', function() {
    const pwdInput = document.getElementById('hexo-blog-encrypt-pwd');
    if (!pwdInput) return;
  
    // 移动端自动聚焦密码框
    if (window.innerWidth <= 768px) {
      pwdInput.focus();
    }
  
    // 拦截所有回车键事件（兼容手机和PC）
    pwdInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault(); // 阻止默认换行行为
        if (typeof decrypt === 'function') {
          decrypt(); // 调用解密函数
        } else {
          console.error('解密函数未加载！');
        }
      }
    });
  });