const withdrawalButton = document.getElementById("withdrawal-button");

function withdrawalcheck() {
    if(withdrawalButton.onclick){
        alert("전체 사이트를 탈퇴힙니다.탈퇴시 모든 개인개정은 바로 삭제되며, 계정을 사용하실수 없습니다. 정말로 탈퇴하시겠습니까?");
    }
}