// Demo 地址： https://codepen.io/akilathiwanka/pen/JpBObV
class SelectMember {
    constructor(){
        this.MockUsers = window.MockUsers;
        this.init();
    }
    selectClassName = 'checked';
    toastTimer = 0;
    init(){
        this.initMemberList('#MemberList', this.MockUsers);
        this.initBindEvent();
    }

    initMemberList(element, memberList){
        let html = '';
        memberList.map(item => {
            const selected = item.selected ? `class='${this.selectClassName}'` : '';
            html += `
                <li>
                    <div class='user-image'>
                        <img src='${item.image}'>
                    </div>
                    <div class='user-data'>
                        <h4>${item.first_name}</h4><span>${item.email}</span>
                    </div>
                    <label class='round-checkbox'>
                        <span ${selected}></span>
                    </label>
                </li>
            `
        })
        $(element).html(html);
    }

    selectMember(){
        const MemberListDOM = $('#MemberList');
        const checkName = this.selectClassName;
        let target = event.target;
        while (target !== MemberListDOM) {
            if (target.tagName && target.tagName.toLowerCase() === 'li') {
                let selectDOM = $(target).children('.round-checkbox').children('span');
                if (selectDOM && selectDOM.hasClass(checkName)) {
                    selectDOM.removeClass(checkName);
                } else {
                    selectDOM.addClass(checkName)
                }
                break;
            }
            target = target.parentNode;
        }
    }

    searchMember(input){
        const memberName = input.target.value;
        const targetMemberList = this.MockUsers.filter(item => item.first_name == memberName);
        targetMemberList && targetMemberList.length > 0 && this.initMemberList('#MemberList', targetMemberList);
        memberName === '' && this.initMemberList('#MemberList', this.MockUsers);
        const renderMemberList = 
            memberName === '' ? this.MockUsers :
            targetMemberList && targetMemberList.length > 0 ? targetMemberList :
            [];

        // TODO 练习项目，暂不考虑渲染性能
        this.initMemberList('#MemberList', renderMemberList);
    }

    initBindEvent(){
        $('#MemberList').click(this.selectMember.bind(this));
        $('#InputMember').bind('input porpertychange', this.searchMember.bind(this));
        $('#SubmitButton').click(this.submitSelect.bind(this));
    }

    submitSelect(){
        const memberList = Array.from($('#MemberList li'));
        const result = {
            text: [],
            dom : [],
        };
        memberList.map(item => {
            const hasClass = $(item).children('.round-checkbox').children('span').hasClass(this.selectClassName);
            if(hasClass){
                result.text.push($(item).children('.user-data').children('h4').text());
                result.dom.push(item);
            }
        })
        console.log(result)
        this.showToast(`选中成员：${result.text}`);
    }

    showToast(text, time = 2000){
        const toast = $('#GlocalToast');
        if(!this.toastTimer){
            toast.text(text);
            toast.show();
            this.toastTimer = setTimeout(this.hideToast.bind(this), time)
        }
    }

    hideToast(){
        const toast = $('#GlocalToast');
        toast.hide();
        this.toastTimer = 0;
    }
}

let newMember = new SelectMember();