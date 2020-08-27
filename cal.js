brackets={
	"[":false,
	"]":true,
	"{":false,
	"}":true
}
//Sin()<br>Cos()<br>Tan()<br>aSin()<br>aCos()<br>aTan()<br>DtR()<br>RtD()
function calc(input,ignore,depth){
	if(depth==undefined){
		depth=1
	}else{
		depth++
	}
	input=input.toLowerCase()
	while(input.includes("--")){
		input=input.replace("--","+")
	}
	while(input.includes("pi")){
		input=input.replace("pi",Math.PI)
	}
	//MARK: convert of brackets
	for(i in brackets){
		while(input.includes(i)){
			input=input.replace(i,brackets[i]?")":"(")
		}
	}
	while(input.includes(" ")){
		input=input.replace(" ","")
	}
	var brc=0
	//MARK: remove brackets with check of right brackets
	var remove=[]
	var count=0
	var start
	var content
	for(i of input){
		if(i==")"){
			brc--
			if(brc==0){
				remove[remove.length]=[start,count,content]
			}
		}
		if(brc>0){
			content+=i
		}
		if(i=="("){
			if(brc==0){
				start=count
				content=""
			}
			brc++
		}
		if(brc<0){
			console.error("wrong brackets "+(count+1)+" in "+ input+" in depth "+depth)
			return NaN
		}
		count++
	}
	if(brc>0){
		var br=""
		for(i=0;i!=(brc-1);i++){
			br+=")"
		}
		remove[remove.length]=[start,count+brc,content+br]
	}
	for(i=0;i!=brc;i++){
		input+=")"
	}
	console.log(remove)
	console.log(depth+": "+input)
	for(i in remove){
		var y=remove.length-i-1
		//input=input.split("("+remove[i][2]+")").join((parseInt(input[remove[i][0]-1])?"*":"")+calc(remove[i][2],ignore,depth)+(parseInt(input[remove[i][1]+1])?"*":""))
		//input=input.replace("("+remove[i][2]+")",(parseInt(input[remove[i][0]-1])?"*":"")+calc(remove[i][2],ignore,depth)+(parseInt(input[remove[i][1]+1])?"*":""))
		var chose
		try {
			chose=input[remove[y][0]-3]+input[remove[y][0]-2]+input[remove[y][0]-1]
			if(arit.includes(chose)&&arit.includes(input[remove[y][0]-4])){
				chose=input[remove[y][0]-4]+chose;
				if(!arit.includes(chose)){
					chose=input[remove[y][0]-3]+input[remove[y][0]-2]+input[remove[y][0]-1]
				}
			}
			
		} catch (error) {
			chose=""
		}
		if(!fun(chose,calc(remove[y][2],ignore,depth))){console.error("err in depth "+depth+": "+chose+"("+remove[y][2]+")"+" return "+fun(chose,calc(remove[y][2],ignore,depth)))}
		input=input.slice(0,remove[y][0]-chose.length)+(num.includes(input[remove[y][0]-1-chose.length])?"*":"")+fun(chose,calc(remove[y][2],ignore,depth))+(num.includes(input[remove[y][1]+1])?"*":"")+input.slice(remove[y][1]+1,undefined)
	}
	/* while(input.includes("(")){
		zavorka=input.slice(input.indexOf("(")+1,input.includes(")")?input.indexOf(")"):undefined)
		input=input.replace("("+zavorka+")",(parseInt(input[input.indexOf("(")-1])?"*":"")+calc(zavorka,ignore))
	} */
	while(input.includes("--")){
		input=input.replace("--","+")
	}
	console.log(depth+": "+input)
	return eval(input)
}
var arit="asinacosatandtrtd"
function fun(a,input){
	switch(a){
		case "sin":
		return Math.sin(input)
		case "cos":
		return Math.cos(input)
		case "tan":
		return Math.tan(input)
		case "asin":
		return Math.asin(input)
		case "acos":
		return Math.acos(input)
		case "atan":
		return Math.atan(input)
		case "dtr":
		return dtr(input)
		case "rtd":
		return rtd(input)
		default:
		return input
	}
}
function dtr(a){
	return Math.PI/180*a
}
function rtd(a){
	return a/Math.PI*180
}
var num="0123456789"