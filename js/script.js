// 打开咨询表格模态框
function openConsultationForm() {
    const modal = document.getElementById('consultationModal');
    modal.style.display = 'block';
}

// 关闭咨询表格模态框
function closeConsultationForm() {
    const modal = document.getElementById('consultationModal');
    modal.style.display = 'none';
}

// 电话咨询处理
function openPhoneConsultation() {
    alert('电话咨询热线: +86 400-XXXXXXX\n工作时间: 周一至周五 9:00-18:00');
}

// 显示项目详情
function showProjectDetails(projectType) {
    if (projectType === 'summer-school') {
        window.location.href = 'summer-school.html';
        return;
    }

    const projectInfo = {
        'short-term': {
            title: '短期游学项目详情',
            content: '1–4周沉浸式英国教育体验\n\n✓ 7–18岁（中小学）\n  - 寄宿学校体验\n  - 国际学生交流\n  - 英语能力快速提升\n\n✓ 18–22岁（大学生）\n  - 学术课程 / 专业体验\n  - 英语强化 + Presentation训练\n  - 海外背景提升'
        },
        'boarding': {
            title: '私校插班项目详情',
            content: '进入英国私立学校进行短期或中期学习\n\n⏱ 时间选择：\n  - 2周体验\n  - 1学期课程\n  - 多学期项目\n\n🎯 核心亮点：\n  - 真正进入英国本地课堂\n  - 与英国学生一起上课\n  - 提前建立升学路径\n  - 适合计划长期留学学生'
        },
        'summer-school': {
            title: '官方暑期学校项目详情',
            content: '官方暑期学校项目列表页已上线，请查看具体项目详情。'
        }
    };

    const project = projectInfo[projectType] || projectInfo['short-term'];
    alert(project.title + '\n\n' + project.content + '\n\n👉 了解更多详情，请咨询我们的顾问团队!');
    openConsultationForm();
}


// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('consultationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 初始化 EmailJS
emailjs.init("kFj9_Wfh6l0koZSi4");

// 表格提交处理
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const wechat = this.querySelector('input[name="wechat"]').value;
            const content = this.querySelector('textarea[name="content"]').value;
            
            // 准备邮件参数
            const templateParams = {
                to_email: 'songyijing555@gmail.com',
                from_email: email || '未提供',
                client_name: name,
                client_phone: phone || '未提供',
                client_wechat: wechat,
                client_message: content || '未提供',
                reply_to: email || 'songyijing555@gmail.com'
            };
            
            // 显示发送中提示
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 使用 EmailJS 发送邮件
            emailjs.send('service_dguz09a', 'template_4g1pufz', templateParams)
                .then(function(response) {
                    console.log('邮件发送成功:', response.status, response.text);
                    alert('感谢您的咨询！🎉\n\n您的信息已成功提交。\n我们的顾问团队将在24小时内与您联系。\n\n📧 我们已将您的信息发送至 songyijing555@gmail.com');
                    form.reset();
                    closeConsultationForm();
                })
                .catch(function(error) {
                    console.error('邮件发送失败:', error);
                    alert('邮件发送失败，请重试或直接联系我们：\n📧 songyijing555@gmail.com\n📱 +447548312157\n微信：976029751');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // 平滑滚动导航链接
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 添加咨询按钮事件监听
    const consultationBtns = document.querySelectorAll('.consultation-btn-header, .cta-button');
    consultationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('咨询') || this.textContent.includes('开始咨询') || this.textContent.includes('免费')) {
                openConsultationForm();
            }
        });
    });

    // 为"了解详情"按钮添加功能
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const projectTypes = ['short-term', 'boarding', 'summer-school'];
            showProjectDetails(projectTypes[index]);
        });
    });
});
