const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdkqgok';

// 打开咨询表格模态框
function openConsultationForm() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 关闭咨询表格模态框
function closeConsultationForm() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'none';
    }
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
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

// 页面交互
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.setAttribute('action', FORMSPREE_ENDPOINT);
        form.setAttribute('method', 'POST');
        form.setAttribute('target', '_blank');

        // 设置提交后跳转到网站自己的感谢页
        if (!form.querySelector('input[name="_next"]')) {
            const nextInput = document.createElement('input');
            nextInput.type = 'hidden';
            nextInput.name = '_next';
            const base = window.location.href.replace(/\/[^/]*$/, '/');
            nextInput.value = base + 'thank-you.html';
            form.appendChild(nextInput);
        }

        if (!form.querySelector('input[name="_subject"]')) {
            const subjectInput = document.createElement('input');
            subjectInput.type = 'hidden';
            subjectInput.name = '_subject';
            subjectInput.value = '英国游学咨询表单';
            form.appendChild(subjectInput);
        }
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
