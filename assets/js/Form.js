
/**
 * Các bước thực hiện
 * 1. Lấy ra các lớp của các RULE cần giải quyết
 * 2. Lấy ra các input tương ứng với từng RULE
 * 3. Cài đặt các quy định của RULE : Email, password...
 * 4. Thực hiện ONBLUR in ra các thông báo khi có lỗi hoặc không có lỗi
 * 5. Tìm và đẩy kết quả của ONBLUR vào trong class chứa thông báo lỗi
 * 6. Lấy ra input tương ứng và add/remove class ERROR để hiển thị màu đỏ nếu có lỗi  
 * 7. Bắt sự kiện ONINPUT vào input đăng nhập
 * 8. Nếu đang sai khi ONINPUT vào sẽ remove class ERROR
 * 9.   
 */


function Form(options) {
    var formElement  = document.querySelector(options.form)
    var selectorRule = {};
    function checkRegister(inputElement,rule) {
                // 1. Nếu sai => 'Vui lòng nhập lại'
                // 2. Nếu đúng => undifined
            var messError;
                // Lấy ra input để add/remove class error
            var inputError = inputElement.parentElement.querySelector(options.boxError)
                // Lấy ra class chứa phần thông báo lỗi đăng nhập
            var messeError = inputElement.parentElement.querySelector(options.messError)

            // Lấy ra các rules của selections
            var rules = selectorRule[rule.selections];
            // Lặp qua các rule và kiểm tra
            // Nếu có lỗi dừng việc kiểm tra
            for(var i = 0; i < rules.length; i++) {
                messError = rules[i](inputElement.value)
                if(messError) break
            }

                if(messError) {
                    messeError.innerText = messError;
                    inputError.classList.add('error')
                } else {
                    messeError.innerText = '';
                    inputError.classList.remove('error')
                }
                return !messError
    }
    // Lấy element của form cần check
    if(formElement) {
        
    //     formElement.onsubmit = function(e) {
    //         e.prevenDefault()
    //         options.ruler.forEach(function(rule) {
    //             var inputElement = formElement.querySelector(rule.selections)
    //             checkRegister(inputElement,rule)
    //     })
    // }    

        var isFormValid = true;
        //lặp qua từng rules và validate
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
           var isValid =  checkRegister(inputElement,rule);
           if(!isValid) {
            isFormValid = false;
           }
        });
        if(isFormValid) {
            console.log('Khong co loi')
        } else {
            console.log('co loi')
        }
    }
        // Lặp qua môi rule và xử lý(lắng nghe sự kiện blur, input, ...)
        options.ruler.forEach(function(rule) {

            // Lưu các RULE vào 1 mảng khi 1 input có nhiều RULE
            if(Array.isArray(selectorRule[rule.selections])) {
                selectorRule[rule.selections].push(rule.test)
            }else {
                selectorRule[rule.selections] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selections)
            // Xử lý hành vi của người dùng khi blur ra ngoài input
            inputElement.onblur = function() {
                checkRegister(inputElement,rule)
            }
            // Xử lý hành vi của người dùng khi bắt đầu nhập vào input sau khi bị lỗi
            inputElement.oninput = function() {
                var inputError = inputElement.parentElement.querySelector(options.boxError)
                var messeError = inputElement.parentElement.querySelector(options.messError)
                    messeError.innerText = '';
                    inputError.classList.remove('error')
            }
        })

    
}

// ĐỊNH NGHĨA RULE
// 1. Nếu sai => 'Vui lòng nhập lại'
// 2. Nếu đúng => undifined
Form.isEmail = function(selections) {
   return {
       selections: selections,
       test: function(value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(value.match(regex)) {
                return undefined
            } else {
                return 'Email của bạn không hợp lệ !'
        }
       }
   }

}
Form.isPassWord = function(selections, min, mess) {
    return {
       selections: selections,
       test: function(value) {
            return value.length >= min ? undefined : mess || `Mật khẩu không dưới ${min} ký tự`
       }
   }
}
Form.isOldPassWord = function(selections, checkValue, mess) {
    return {
       selections: selections,
       test: function(value) {
        return value === checkValue() ? undefined : mess || 'Giá trị không trùng khớp'
       }
    }
}
Form.isRequired = function(selections) {
    return {
       selections: selections,
       test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
       }
   }
}