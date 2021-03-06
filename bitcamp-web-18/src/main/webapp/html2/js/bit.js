"use strict"

// 자주 사용할 함수를 라이브러리화 시킨다.
let bit = function(value) {
    var el = [];
    if (value instanceof HTMLElement) {
        el[0] = value;
    } else if (value.startsWith("<")) {
        el[0] = document.createElement(value.substr(1,value.length-2));
    } else {
        var list = document.querySelectorAll(value);
        for (var i = 0; i < list.length; i++) {
            el[i] = list[i];
        }
    }
    
    // 개발자가 쓰기 좋은 함수를 추가해서 리턴하자
    el.html = function(value) {
        if (el.length == 0) {
            return el[0].innerHTML;
        }
        for (var e of el) e.innerHTML = value;
        return el;
    };
    
    el.append = function(child) {
        for (var e of el)
            e.appendChild(child);
        return el;
    };
    
    el.appendTo = function(parent) {
        for (var e of el)
            parent[parent.length-1].appendChild(e);
        return el;
    };
    
    el.attr = function(name, value) {
        if (arguments.length < 2) {
            return el[0].getAttribute(name);
        }
        for (var e of el)
            e.setAttribute(name, value);
        return el;
    };
    
    el.removeAttr = function(name) {
        for (var e of el)
            e.removeAttribute(name);
        return el;
    };
    
    el.on = function(name, p2, p3) {
        var selector = null;
        var handler = null;
        
        if (arguments.length == 2) handler = p2;
        if (arguments.length == 3) {
            selector = p2;
            handler = p3;
            
        }
        for (var e of el) {
            if (!selector) {
                e.addEventListener(name, handler);
            } else {
                // selector에 해당되는지 검사하는 함수 먼저 호출
                e.addEventListener(name, function(event) {
                    // 현재 태그의 자식태그 중에서 selector 조건에 해당되는 자식 태그들을 찾는다.
                    var selectorTargets = e.querySelectorAll(selector);
                    
                    // 자식 태그들 중에 이 이벤트가 발생된 태그를 찾는다
                    for (var target of selectorTargets) {
                        
                        // 만약 이벤트가 발생된 태그와 일치하는 자식 태그가 있다면 그때 핸들러를 호출해 준다.
                        if (event.target == target) {
                            handler(event);
                            break;
                        }
                    }
                });
            }
        }
        return el;
    };
    
    el.click = function(handler) {
        return el.on('click', handler);
    };
    
    el.css = function(name, value) {
        if (arguments.length == 1) {
            return el[0].style[name];
        }
        for (var e of el) {
            e.style[name] = value;
        }
        return el;
    };
    
    el.val = function(value) {
        if (arguments.length == 0) {
            return el[0];
        }
        for (var e of el) {
            e.value = value;
        }
        return el;
    };
         
    return el;
};

bit.parseQuery = function(url) {
    var paramMap = {};
    var qs = url.split('?');
    if (qs.length > 1) {
        var params = qs[1].split('&');
        for (var param of params) {
            var kv = param.split('=');
            paramMap[kv[0]] = kv[1];
        }
    }
    return paramMap;
};

bit.ajax = function(url, settings) {
    
    if (settings == undefined) {
        settings = {};
    }
    
    if (settings.dataType == undefined) {
        settings.dataType = "text";
    }
    
    if (settings.method == undefined) {
        settings.method = 'GET';
    }
    
    var xhr = new XMLHttpRequest();
    console.log("=--=--=");
            
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState === 4) {
            
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                let data = xhr.responseText;
                if (settings.dataType == 'json') {
                    data = JSON.parse(xhr.responseText);
                }
                if (settings.success) {
                    settings.success(data);
                }
                if (done) {
                    done(data);
                }
            } else {
                if (sttings.error) {
                    error();
                }
                return;
            }
        }
        
    };
    
    var qs = '';
    if (settings.data) {
        for (var propName in settings.data) {
            qs += `&${propName}=${settings.data[propName]}`;
        }
    }
    
    if (settings.method == 'GET') {
        if (url.indexOf('?') == -1) url+='?';
        url += qs;
        xhr.open(settings.method, url, true);
        xhr.send();
    } else {
        xhr.open(settings.method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }
    
    let done;
    xhr.done = function(func) {
        done = func;
    };
    
    return xhr;
}

bit.getJSON = function(url, p2, p3) {
    let data = {};
    let success = null;
    
    if (arguments.length > 1) {
        if (typeof p2 == "function") success = p2;
        else data = p2;
        
        if (typeof p3 == "function") success = p3;
    }

    return bit.ajax(url, {
        dataType: 'json',
        data: data,
        success: success
    });
}

bit.post = function(url, p2, p3, p4) {
    let data = {};
    let success = null;
    let dataType = 'text';
    
    if (arguments.length == 2) {
        if (typeof p3 == "function") {
            data = p2;
            success = p3;
        } else if (typeof p2 == "function") {
            success = p2;
            dataType = p3;
        } else {
            data = p2;
            dataType = p3;
        }
    } else if (arguments.length > 2) {
        data = p2;
        success = p3;
        dataType = p4;
    }

    return bit.ajax(url, {
        dataType: dataType,
        data: data,
        success: success
    });
}

// javascript 에서는 $를 변수명으로 사용할 수 있다.
let $ = bit;