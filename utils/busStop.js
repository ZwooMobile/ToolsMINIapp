//按照圆心距sort
let getNearSort = (arr, lat, lon) => {
  return function(a,b){
    a.Latitude = (a.Latitude * 1);
    b.Latitude = (b.Latitude * 1);
    let thisArcDis = Math.pow(a.Latitude - lat, 2) + Math.pow(a.Longitude - lon, 2);
    let lastArcDis = Math.pow(b.Latitude - lat, 2) + Math.pow(b.Longitude - lon, 2);
    return thisArcDis - lastArcDis;
  }
}

//截取排序好最近的十个元素
let getNearByStation = (arr, lat, lon) => {
  // let sortArray = arr.sort(getNearSort(arr, lat, lon));
  let sortArray = arr.sort((a,b) => a.distance * 1 - b.distance * 1);
  console.log(sortArray)
  // return nextSort(groupBy(sortArray),lat,lon);
  return groupBy(sortArray);
}

//根据路名或站名或号码搜索
let searchItem = (str) => {
  var reg = new RegExp(`\\${str}`,'ig');
  let roadArr = BusStop.filter(item => reg.test(item.RoadName) || reg.test(item.Description));
  let stopArr = BusStop.filter(item => item.BusStopCode.indexOf(str) != -1);
  return groupBy(roadArr.concat(stopArr));
}

//按照路名分組
let groupBy = (array) => {
  let roadArr = [];
  let newArr = [];
  array.forEach(item => {
    let RoadName = item.RoadName;
    let newItem = Object.assign({},item);
    delete newItem.RoadName;
    if(roadArr.indexOf(RoadName) == -1){
      newArr.push({ RoadName, station: [newItem]})
      roadArr.push(RoadName);
    }else{ 
      let sameIndex = newArr.findIndex(x => { return x.RoadName == RoadName})
      newArr[sameIndex].station.push(newItem);
    }
  })
  return newArr;
}

let nextSort = (array, lat, lon) => {
  array.forEach(i => {
    i.station = i.station.sort(getNearSort(i.station, lat, lon));
  })
  return array;
}

module.exports = {
  getNearByStation
}