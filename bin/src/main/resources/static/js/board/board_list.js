const writeButton = document.querySelector(".write-button");
const showMyWritingHistoryButton = document.querySelector(".board-history-button");
const searchKeyword = document.querySelector(".input-box");
const searchButton = document.querySelector(".search-btn");

const contentTableBody = document.querySelector(".content-table-body");


let nonMemberRequestData = null;
let boardType = null;
let authenticationNumber = null;



boardType = getBoardType();


loadPageHistoryByLocalStorage();

checkHasNonMemberInquiryListData();

setBoardContentByBoardType();
setBoardTableByBoardType();

writeButton.onclick = loadBoardWritePage;
showMyWritingHistoryButton.onclick = loadWritingHistoryPage;

searchButton.onclick = () => getBoardList(1);



function getBoardType() {
    return location.pathname.indexOf("complaint") != -1 ? "complaint" : location.pathname.indexOf("praise") != -1 ? "praise" : "suggestion";
}

function isNonMemberView() {
    return location.pathname.indexOf("non-member") != -1;
}

function checkHasNonMemberInquiryListData() {
    let nonMemberInquiryList = localStorage.nonMemberInquiryList;

    if(nonMemberInquiryList != null){
        nonMemberInquiryList = JSON.parse(nonMemberInquiryList);

        let totalPage = getTotalPage(nonMemberInquiryList[0].totalCount, 2);
        setPage(totalPage);
        setTotalCount(nonMemberInquiryList[0].totalCount);
        setBoardList(nonMemberInquiryList);

        localStorage.removeItem("nonMemberInquiryList");
    }else {
        loadPage(nowPage);
    }
}

function loadPage(page) {
    getBoardList(page)
}

function getBoardList(page){
    let searchType = getSelectedOptionValue();
    let keyword = getSearchKeyword();
    
    nonMemberRequestData = localStorage.nonMemberRequestData;

    if(!isNonMemberView()) {
        $.ajax({
            type:"get",
            url:`/api/v1/board/${boardType}/list/member`,
            data: {
                "userCode": userCode,
                "searchType": searchType,
                "keyword": keyword,
                "page": page
            },
            dataType:"json",
            success:(response)=>{
                if(response.data != null){
                    let totalPage = getTotalPage(response.data[0].totalCount, 2);
                    setPage(totalPage);
    
                    setTotalCount(response.data[0].totalCount);
                    setBoardList(response.data);
                }else {
                    boardListNoResult();
                    setTotalCount(0);
                }
            },
            error:(request, status, error)=>{
                console.log(request.status);
                console.log(request.responseText);
                console.log(error);
            }
        });

    }else {
        if(nonMemberRequestData != null) {
            nonMemberRequestData = JSON.parse(nonMemberRequestData);
            $.ajax({
                type:"get",
                url:`/api/v1/board/${boardType}/list/non-member`,
                data: {
                    "userName": nonMemberRequestData.userName,
                    "mainPhoneNumber": nonMemberRequestData.mainPhoneNumber,
                    "authenticationNumber": nonMemberRequestData.authenticationNumber,
                    "searchType": searchType,
                    "keyword": keyword,
                    "page": page
                },
                dataType:"json",
                success:(response)=>{
                    if(response.data != null){
                        let totalPage = getTotalPage(response.data[0].totalCount, 2);
                        setPage(totalPage);
        
                        setTotalCount(response.data[0].totalCount);
                        setBoardList(response.data)
                    }else {
                        boardListNoResult();
                        setTotalCount(0);
                    }
                },
                error:(request, status, error)=>{
                    console.log(request.status);
                    console.log(request.responseText);
                    console.log(error);
                }
            });

        }else {
            boardListNoResult();
            setTotalCount(0);
        }
    }
}

function setTotalCount(totalCount) {
    const totalCountSpan = document.querySelector(".total-count-span");

    totalCountSpan.textContent = totalCount;
}

function setBoardList(boardList){
    clearDomObject(contentTableBody);

    if(boardType == "praise") {
        for(board of boardList){
            let date = board.createDate.substring(0, 10);
            let time = board.createDate.substring(11, 16);
    
            contentTableBody.innerHTML += `
                <tr>
                    <td class="content-title"><span>${board.boardTitle}</span></td>
                    <td class="content-name">${board.userName}</td>
                    <td class="content-date">${date} ${time}</td>
                </tr>
            `
        }

    }else {
        for(board of boardList){
            let date = board.createDate.substring(0, 10);
            let time = board.createDate.substring(11, 16);
    
            contentTableBody.innerHTML += `
                <tr>
                    <td class="company-name">${board.companyName}</td>
                    <td class="content-title"><span>${board.boardTitle}</span></td>
                    <td class="progress-status">${board.progressStatus}</td>
                    <td class="content-name">${board.userName}</td>
                    <td class="content-date">${date} ${time}</td>
                </tr>
            `
        }
    }

    setBoardTitleClickEvent(boardList);
}

function boardListNoResult() {
    contentTableBody.innerHTML = `
        <tr class="list-unit">
            <td class="data-none" colspan="${boardType == "praise" ? 3 : 5}">????????? ????????? ????????????.</td>
        </tr>`;
}

function setBoardTitleClickEvent(boardList) {
    const boardTitle = document.querySelectorAll("tbody .content-title span");

    for(let i = 0; i < boardTitle.length; i++) {
        boardTitle[i].onclick = () => loadBoardDetailPage(boardList[i].boardCode);
    }
}

function setBoardContentByBoardType() {
    const boardTypeTile = document.querySelector(".board-type-title");
    const menuLi = document.querySelector(".menu-li");

    if(boardType == "praise") {
        boardTypeTile.textContent = "???????????????"

        menuLi.innerHTML = `
            <p>???????????? ????????? ?????? ???????????? ???????????? ?????? ?????? ????????? ???????????? ?????? ?????????????????????.</p>
            <ul class="menu-li-ul">
                <li>?????? ????????? ??? ?????? ??? ???????????? ????????? ????????? ????????? ???????????? ????????? ??????????????????.</li>
                <li>????????? ????????? ?????? ?????? ???????????? ?????? ?????? ?????? ?????? ??? "????????? ?????? ??? ???????????????" ????????? ???????????? ?????? ??????????????????.</li>
            </ul>
        `;
    }else if(boardType == "suggestion") {
        boardTypeTile.textContent = "???????????????"

        menuLi.innerHTML = `
        <p>???????????? ??????????????? ????????? ?????? ???????????? ?????? ???????????? ????????? ??????????????????.</p>
        <p>?????? ???????????? ????????? ??? ?????????????????????.<p>
        <ul class="menu-li-ul">
            <li>????????? ????????? ????????? ????????? ?????? ????????? ????????? ?????? ?????? ??? ??????????????? ???????????? ??? ????????????.</li>
        </ul>
    `;
    }
}

function setBoardTableByBoardType() {
    if(boardType != "praise") {
        const tableHead = document.querySelector(".content-table-head");

        tableHead.innerHTML = `
            <tr>
                <th class="company-name">?????? ?????? ?????????</th>
                <th class="content-title">??????</th>
                <th class="progress-status">????????????</th>
                <th class="content-name">?????????</th>
                <th class="content-date">?????????</th>
            </tr>
        `;
    }
}

function getSelectedOptionValue() {
    const searchTypeSelect = document.querySelector(".select-btn");

    return searchType = searchTypeSelect.options[searchTypeSelect.selectedIndex].value;
}

function getSearchKeyword() {
    return searchKeyword.value;
}

function clearDomObject(domObject){
    domObject.innerHTML="";
}

function loadBoardDetailPage(boardCode) {
    setPageInfoLocalStorage();

    if(checkNonMemberViewPage()) {
        location.href = `/customer/praise/non-member/detail/${boardCode}`;

    }else {
        location.href = `/customer/${boardType}/detail/${boardCode}`;

    }

}

function loadBoardWritePage() {
    location.href = `/customer/${boardType}/regist-view`;
}

function loadWritingHistoryPage() {
    location.href = `/mypage/writing/customer`;
}


function setPageInfoLocalStorage() {
    let searchType = getSelectedOptionValue();
    let keyword = getSearchKeyword();
    
    let boardPageInfoObject = {
        "searchType": searchType,
        "keyword": keyword,
        "page": nowPage
    };

    localStorage.boardPageInfo = JSON.stringify(boardPageInfoObject);
}

function getLocalStorageData() {
    let pageHistory = localStorage.boardPageInfo;

    if(pageHistory != null) {
        return pageHistory;
    }else {
        return null;
    }
}

function loadPageHistoryByLocalStorage() {
    let localStorageData = getLocalStorageData();
    if(localStorageData != null) {
        const selectOptionItems = document.querySelectorAll(".select-btn option");

        localStorageData = JSON.parse(localStorageData);
    
        selectOptionItems.forEach(option => {
            if(option.value == localStorageData.searchType) {
                option.setAttribute("selected", true);
            }
        });
        searchKeyword.value = localStorageData.keyword;
        nowPage = localStorageData.page;
        
        localStorage.removeItem("boardPageInfo");
    }
}

function checkNonMemberViewPage() {
    return location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "non-member";
}