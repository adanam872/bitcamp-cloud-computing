    console.log($(eId).val());
    
    var data = null;
    var {id, page, size} = $.parseQuery(location.href);
    
    if (id == undefined) {
        $(".viewform").css('display', 'none');
        $(eId).removeAttr("readonly");
    } else {
        $(".newform").css('display', 'none');
        
        $.getJSON(`../../json/member/view/${id}`, function(result) {
            data = result;
            if (data.member == null) {
                alert('아이디가 무효합니다');
                location.href="list.html";
            }
            $(eId).val(data.member.id);
            $(eEmail).val(data.member.email);
        });        
    }
    
    $(eListBtn).click(function() {
        if (page) {
            location.href = `list.html?page=${page}&size=${size}`;
        } else {
            location.href = 'list.html';
        }
    });
    
    $(eAddBtn).click(function() {
        
        $.ajax('../../json/member/add', {
            method: 'POST',
            dataType: 'json',
            data: {
                id: $(eId).val(), 
                email: $(eEmail).val(), 
                password: $(ePassword).val()
                    },
            success: function(data) {
                if (data.status == "success") {
                    location.href = 'list.html';
                } else {
                    alert("오류입니다!");
                    console.log(data.error);
                }
            }
         });
    });
    
    $(eUpdateBtn).click(function() {
        
        $.post('../../json/member/update', 
                {
                    id: $(eId).val(), 
                    email: $(eEmail).val(), 
                    password: $(ePassword).val()
                },
                function(data) {
                    if (data.status == 'success') {
                        location.href = `list.html?page=${page}&size=${size}`;
                    } else {
                        alert('변경 오류입니다!');
                        console.log(data.error);
                    }
                },
                'json');
    });
    
    $(eDeleteBtn).click(function() {
        $.getJSON(`../../json/member/delete?id=${eId.value}`, 
                function(data) {
            if (data.status == "success") {
                location.href = `list.html?page=${page}&size=${size}`;
            } else {
                alert("삭제 오류입니다!");
                console.log(data.error);
            }
        });
    });