let user = getUser();
let userCode = setUserCode();

const myInfoUpdateTable = document.querySelector(".myinfo-update-table");
let birthType1 = document.getElementById("ym");
let birthType2 = document.getElementById("em");

function getUser() {
    let user = null;
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/auth/principal`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                user = response.data;
            }
        },
        error: (request, status, error) => {
            // console.log(request.status);
            // console.log(request.responseText);
            // console.log(error);
        }
    });

    return user;
}


myInfoUpdateTable.innerHTML = `
<tr>
                                <th scope="row">
                                    <span class="essential">이름</span>
                                </th>
                                <td class="user_updatename">${user.userName}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="">성별</span>
                                </th>
                                <td class="user_gender">${user.userGender == 1 ? "남성" : "여성"}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">생년월일</span>
                                </th>
                                <td>
                                    <div class="birth">
                                        <input type="text" id="year" class="year" style="width: 60px;  height: 28px; background: #f5f5f5;" maxlength="4" value="${user.birthYear}">
                                        <label for="year">년</label>
                                        <input type="text" id="month" class="month" style="width: 50px;  height: 28px; background: #f5f5f5;" maxlength="2" value="${user.birthMonth}">
                                        <label for="month">월</label>
                                        <input type="text" id="day" class="day" style="width: 50px; height: 28px;  background: #f5f5f5;" maxlength="2" value="${user.birthDay}">
                                        <label for="day">일</label>
                                        <input type="radio" id="yM" class="birty-type" name="birty-type" value="1">
                                        <label for="yM">양력</label>
                                        <input type="radio" id="eM" class="birty-type" name="birty-type" value="2">
                                        <label for="eM">음력</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential"><label for="username">아이디</label></span>
                                </th>
                                <td class="user-id-div">
                                    <input type="text" class="user-id" style="width: 138px;" height="28px;" maxlength="10" value="${user.userId}">
                                    
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">비밀번호</span>
                                </th>
                                <td>
                                    <input type="password" class="password" style="width: 138px;" maxlength="10" aria-autocomplete="list">
                                    <span class="password-guide">※영문+숫자+특수문자의 8~10자 이내</span>
                                    <span class="password-guide error">※ 패스워드에 사용 가능한 특수문자</span>
                                        : ! @ # $ % ^ + =
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">비밀번호 확인</span>
                                </th>
                                <td>
                                    <input type="password" class="password_confirm" style="width: 138px;" maxlength="10">
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">주소</span>
                                </th>
                                <td>
                                    <div class="address">
                                        <input type="text" class="postal-code" style="width: 100px;" readonly value="${user.postalCode}">
                                        <button type="button" class="button light search-address">우편번호 찾기</button>
                                        <p>
                                            <input type="text" class="main-address" style="width: 356px;" readonly value="${user.mainAddress}">
                                            <input type="text" class="detail-address" style="width: 354px;" value="${user.detailAddress}">
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th class="row">
                                    <span>일반전화</span>
                                </th>
                                <td>
                                    <div class="sub-phone-box">
                                        <select class="select-box phone-select-box" style="width: 80px; height: 28px;">
                                            <option value="">선택</option>
                                            <option value="02">02</option>
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="019">019</option>
                                            <option value="070">070</option>
                                            <option value="031">031</option>
                                            <option value="032">032</option>
                                            <option value="033">033</option>
                                            <option value="041">041</option>
                                        </select>
                                        <em>-</em>
                                        <input type="text" class="middle-number" value="" style="width: 58px;" maxlength="4" title="휴대전화 중간자리 번호" value="">
                                        <em>-</em>
                                        <input type="text" class="last-number" value="" style="width: 58px;" maxlength="4" title="휴대전화 뒷자리 번호">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">휴대전화</span>
                                </th>
                                <td>
                                    <div class="main-phone-box">
                                        <select class="select-box phone-select-box" style="width: 80px; height: 28px;">
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                        </select>
                                        <em>-</em>
                                        <input type="text" class="middle-number" value="" style="width: 58px;" maxlength="4" title="휴대전화 중간자리 번호">
                                        <em>-</em>
                                        <input type="text" class="last-number" value="" style="width: 58px;" maxlength="4" title="휴대전화 뒷자리 번호">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="essential">이메일</span>
                                </th>
                                <td>
                                    <div class="email">
                                        <input type="text" class="first-email" style="width: 108px;">
                                        <em>@</em>
                                        <input type="text" class="second-email" style="width: 250px;">
                                        <select name="email3" id="email3" class="select-box email-select-box" style="width: 150px; display: none;">
                                            <option value="">직접입력</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="daum.net">daum.net</option>
                                            <option value="nate.com">nate.com</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="yahoo.co.kr">yahoo.com</option>
                                            <option value="empas.com">empas.com</option>
                                            <option value="hotmail.com">hotmail.com</option>
                                            <option value="korea.com">korea.com</option>
                                            <option value="dreamwiz.com">dreamwiz.com</option>
                                            <option value="lycos.co.kr">lycos.co.kr</option>
                                        </select> 
                                        <!-- <a class="selectBox selectBox-dropdown" title="이메일 주소 선택" tabindex="NaN" style="width: 150px; display: inline-block;">
                                            <span class="selectBox-label" style="width: 107px;">직접입력</span>
                                            <span class="selectBox-arrow"></span>
                                        </a> -->
                                        <p class="email-guide" style="margin-top:5px; color:#3652a2;">※ 이메일이 정확하지 않으면 제품 문의에 대한 답변 및 모든 이메일 정보를 받으실 수 없습니다.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="">수신동의</span>
                                </th>
                                <td>
                                    <ul>
                                        <li>
                                            <strong>메일 수신</strong>
                                            <input type="checkbox" class="receive-check-box" id="email-receive">
                                            <label for="email-receive">위니아 브랜드사이트</label>
                                        </li>
                                        <li>
                                            <strong>SMS 수신</strong>
                                            <input type="checkbox" class="receive-check-box" id="sms-receive">
                                            <label for="dm3">위니아 브랜드사이트</label>
                                        </li>
                                        <li>
                                            <strong>우편물 수신</strong>
                                            <input type="checkbox" class="receive-check-box" id="mail-receive">
                                            <label for="mail-receive">위니아 브랜드사이트</label>
                                        </li>
                                    </ul>
                                    <p class="email-guide">※ 이메일, SMS, 우편물 수신에 동의하시면 제품 문의에 대한 답변 및 위니아에서 제공하는 다양한 혜택을 알려드리는 뉴스레터, 이벤트 정보를 받아보실 수 있습니다.</p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <span class="">그룹사명</span>
                                </th>
                                <td>
                                    <select name="staff-company" class="staff-company" style="width: 300px;">
                                        <option value="" selected="selected">선택</option>
                                        <option value="위니아">위니아</option>
                                        <option value="위니아전자">위니아전자</option>
                                        <option value="위니아전자매뉴팩처링">위니아전자매뉴팩처링</option>
                                        <option value="위니아에이드">위니아에이드</option>
                                        <option value="대유플러스">대유플러스</option>
                                        <option value="대유에이텍">대유에이텍</option>
                                        <option value="대유글로벌">대유글로벌</option>
                                        <option value="대유에이피">대유에이피</option>
                                        <option value="대유홀딩스">대유홀딩스</option>
                                        <option value="대유금형">대유금형</option>
                                        <option value="대유합금">대유합금</option>
                                        <option value="동강홀딩스">동강홀딩스</option>
                                        <option value="대유몽베르컨트리클럽">대유몽베르컨트리클럽</option>
                                        <option value="푸른산수목원">푸른산수목원</option>
                                        <option value="대유이피">대유이피</option>
                                    </select>
                                    <span class="group-guide">※ 위니아 임직원인 경우 입력해 주시기 바랍니다.</span>
                            </td>
                            <tr>
                                <th class="row">
                                    <span>임직원 사번</span>
                                </th>
                                <td>
                                    <input type="text" class="employee-number">
                                    <span class="group-guide">※ 위니아 임직원인 경우 입력해 주시기 바랍니다.</span>
                                </td>
                            </tr>

`;

console.log(user);

function setUserCode() {
    let userCode = 0;
    if(user != null) {
        userCode = user.userCode;
    }

    return userCode;
}
console.log(userCode);