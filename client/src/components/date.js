 const month = [{mid:1,ms:"Jan"},{mid:2,ms:"Feb"},{mid:3,ms:"March"},{mid:4,ms:"Apr"},{mid:5,ms:"May"},{mid:6,ms:"Jun"},{mid:7,ms:"Jul"}
,{mid:8,ms:"Aug"},{mid:9,ms:"Set"}];
export const mydate=(num)=>{
  if(num == 12 || num == 11 || num == 10){
      if(num = 11){
          return "NOv";
      }else if(num == 10){
          return "Oct"
      }else{
          return "Dec"
      }
  }else{
     num = num.charAt(1);
      for(let i = 0;i<month.length;i++){
          if(num == month[i].mid){
              return month[i].ms;
          }
      }
  }
}