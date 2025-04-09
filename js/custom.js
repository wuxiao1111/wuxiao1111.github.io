document.addEventListener('DOMContentLoaded', function() {
    // 仅针对加密页面
    if (!document.querySelector('.post-encrypt')) return;
    
    const pwdInput = document.getElementById('hexo-blog-encrypt-pwd');
    if (!pwdInput) return;
  
    // 移动端特殊处理
    if (window.innerWidth <= 768px) {
      // 1. 动态添加移动端优化属性
      pwdInput.setAttribute('enterkeyhint', 'go');
      pwdInput.setAttribute('inputmode', 'numeric');
      
      // 2. 彻底接管回车键
      pwdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopImmediatePropagation(); // 比stopPropagation更强力
        }
      });
  
      // 3. 使用keyup事件确保触发
      pwdInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          // 兼容不同插件版本的解密函数
          const decryptFunc = window.decrypt || window.hexoDecrypt;
          if (typeof decryptFunc === 'function') {
            decryptFunc();
          } else {
            console.error('解密函数未找到:', decryptFunc);
          }
        }
      });
  
      // 4. 禁用其他所有输入框
      document.querySelectorAll('input').forEach(input => {
        if (input !== pwdInput) {
          input.tabIndex = -1;
          input.style.pointerEvents = 'none';
        }
      });
    }
  });