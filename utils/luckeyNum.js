const getLuckeyNum = (digit,type,bir) => {
  console.log(bir)
  if(bir){
    let date = new Date();
    let birDateStr = bir.replace(/-/g,'/');
    let nowDateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    let birStamp = new Date(birDateStr).getTime();
    let birStampStr = birStamp.toString().substr(3, 4).split("").reverse().join("");
    let nowStampStr = String(new Date(nowDateStr).getTime()).substr(3, 4).split("").reverse().join("");
    if (type == '4D'){
      let randomNumStr = (nowStampStr * birStampStr + '').substr(0,4);
      let luckyNum = (parseInt(randomNumStr) < 1000) ? 
      ((new Date().getDay() + 1) * 1000 + parseInt(randomNumStr)) : parseInt(randomNumStr);
      return luckyNum;
    }else{
      let randomNumStr = (nowStampStr * birStampStr + '').substr(0,2);
      let randomNumStr2 = (nowStampStr * birStampStr + '').substr(2,2);
      let luckyNum = (parseInt(randomNumStr) * parseInt(randomNumStr2) + '').substr(0,2);
      luckyNum = parseInt(luckyNum);
      if (luckyNum >= 50) luckyNum -= 50;
      if (luckyNum == 0) luckyNum = new Date().getDate()
      return luckyNum;
    } 
  }else{
    return false;
  }
}

module.exports = {
  getLuckeyNum
}